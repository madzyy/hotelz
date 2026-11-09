from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt

ROOT = Path(r"C:\Users\Tapiwa\Desktop\hotelz")
ASSETS = Path(r"C:\Users\Tapiwa\.cursor\projects\c-Users-Tapiwa-Desktop-hotelz\assets")
OUT = ROOT / "Kipling-Court-Pitch.pptx"

INK = RGBColor(0x1A, 0x24, 0x21)
MUTED = RGBColor(0x5E, 0x6A, 0x66)
TEAL = RGBColor(0x0E, 0x6B, 0x62)
PAPER = RGBColor(0xF6, 0xF4, 0xEF)
CREAM = RGBColor(0xFF, 0xFC, 0xF7)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
LINE = RGBColor(0xE4, 0xDF, 0xD4)

SHOTS = {
    "explore": "image-78ae57ff-fd27-4980-bd56-dad3ea33b141.png",
    "stays": "image-27c26a5e-5f02-409c-9542-727d4537632f.png",
    "stay": "35adba45",
    "pay": "image-5d59b223-20b5-4a19-a12e-51f518b7e11c.png",
}


def shot(name):
    needle = SHOTS[name]
    matches = list(ASSETS.glob(f"*{needle}*"))
    return matches[0] if matches else None


def set_run(run, text, size=18, bold=False, color=INK, font="Calibri"):
    run.text = text
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = font
    run.font.italic = False


def add_rect(slide, l, t, w, h, fill):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, l, t, w, h)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.fill.background()
    return shape


def add_round(slide, l, t, w, h, fill):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, l, t, w, h)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.fill.background()
    return shape


def textbox(slide, l, t, w, h, text, size=18, bold=False, color=INK, align=PP_ALIGN.LEFT):
    box = slide.shapes.add_textbox(l, t, w, h)
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    set_run(p.add_run() if p.runs else p.runs[0] if False else None, text, size, bold, color)
    # pptx always has one empty run-less paragraph; fill it directly
    return box


def fill_p(p, text, size=18, bold=False, color=INK, align=PP_ALIGN.LEFT, space_after=8):
    p.alignment = align
    p.space_after = Pt(space_after)
    run = p.add_run()
    set_run(run, text, size, bold, color)
    return p


def write(slide, l, t, w, h, lines):
    box = slide.shapes.add_textbox(l, t, w, h)
    tf = box.text_frame
    tf.word_wrap = True
    first = True
    for item in lines:
        p = tf.paragraphs[0] if first else tf.add_paragraph()
        first = False
        fill_p(p, **item)
    return box


def bg(slide, color=PAPER):
    add_rect(slide, Inches(0), Inches(0), Inches(13.333), Inches(7.5), color)


def header(slide, kicker="KIPLING COURT"):
    add_rect(slide, Inches(0), Inches(0), Inches(13.333), Inches(0.08), TEAL)
    mark = add_round(slide, Inches(0.55), Inches(0.28), Inches(0.38), Inches(0.38), TEAL)
    tf = mark.text_frame
    tf.word_wrap = False
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    set_run(run, "K", 14, True, WHITE)
    write(
        slide,
        Inches(1.05),
        Inches(0.28),
        Inches(6),
        Inches(0.4),
        [{"text": kicker, "size": 13, "bold": True, "color": TEAL, "space_after": 0}],
    )


def footer(slide, n, total=12):
    write(
        slide,
        Inches(0.55),
        Inches(7.12),
        Inches(8),
        Inches(0.28),
        [{"text": "Direct booking  ·  Fairview, Lusaka", "size": 11, "color": MUTED, "space_after": 0}],
    )
    write(
        slide,
        Inches(11.4),
        Inches(7.12),
        Inches(1.4),
        Inches(0.28),
        [{"text": f"{n:02d}  /  {total:02d}", "size": 11, "color": MUTED, "align": PP_ALIGN.RIGHT, "space_after": 0}],
    )


def add_image(slide, path, l, t, w, h):
    if path and path.exists():
        slide.shapes.add_picture(str(path), l, t, w, h)


def card(slide, l, t, w, h):
    return add_round(slide, l, t, w, h, CREAM)


def build():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank = prs.slide_layouts[6]
    total = 11

    # 1 title
    s = prs.slides.add_slide(blank)
    bg(s)
    add_rect(s, Inches(0), Inches(0), Inches(0.18), Inches(7.5), TEAL)
    write(s, Inches(0.9), Inches(1.7), Inches(7.2), Inches(0.4), [{"text": "PITCH  ·  GUEST JOURNEY", "size": 14, "bold": True, "color": TEAL, "space_after": 0}])
    write(s, Inches(0.9), Inches(2.15), Inches(7.6), Inches(2.2), [{"text": "Kipling Court.\nBooked direct.", "size": 48, "bold": True, "color": INK, "space_after": 0}])
    write(
        s,
        Inches(0.9),
        Inches(4.55),
        Inches(7.2),
        Inches(1.2),
        [{"text": "A house-rate booking site for one Fairview apartment — without Booking.com commission.", "size": 20, "color": MUTED, "space_after": 0}],
    )
    add_image(s, shot("explore"), Inches(8.35), Inches(1.35), Inches(4.5), Inches(5.0))
    footer(s, 1, total)

    # 2 problem
    s = prs.slides.add_slide(blank)
    bg(s)
    header(s)
    write(s, Inches(0.7), Inches(0.95), Inches(12), Inches(1), [{"text": "The problem", "size": 36, "bold": True, "space_after": 0}])
    items = [
        ("Marketplace fees", "OTAs take a large cut on every stay. That tax sits on a small Lusaka apartment."),
        ("Someone else’s brand", "Guests land on Booking.com, not on Kipling Court."),
        ("No control of the journey", "Photos, rates, and checkout live on a platform you do not own."),
    ]
    for i, (title, body) in enumerate(items):
        left = Inches(0.7 + i * 4.1)
        card(s, left, Inches(2.3), Inches(3.85), Inches(3.5))
        add_round(s, left + Inches(0.28), Inches(2.55), Inches(0.42), Inches(0.42), TEAL)
        tb = s.shapes.add_textbox(left + Inches(0.32), Inches(2.58), Inches(0.35), Inches(0.38))
        p = tb.text_frame.paragraphs[0]
        fill_p(p, str(i + 1), 14, True, WHITE, PP_ALIGN.CENTER, 0)
        write(s, left + Inches(0.28), Inches(3.2), Inches(3.3), Inches(2.2), [
            {"text": title, "size": 20, "bold": True, "space_after": 10},
            {"text": body, "size": 15, "color": MUTED, "space_after": 0},
        ])
    footer(s, 2, total)

    # 3 solution
    s = prs.slides.add_slide(blank)
    bg(s)
    header(s)
    write(s, Inches(0.7), Inches(0.95), Inches(12), Inches(1), [{"text": "The product", "size": 36, "bold": True, "space_after": 0}])
    write(s, Inches(0.7), Inches(1.6), Inches(12), Inches(0.6), [{"text": "One apartment. One brand. Direct pay.", "size": 20, "color": MUTED, "space_after": 0}])
    rows = [
        ("What", "Kipling Court 1, Apartment 3, Ituna Road, Fairview, Lusaka"),
        ("Stay", "Two bedrooms · sleeps 4 · kitchen, balcony, parking, Wi-Fi, hot tub"),
        ("Guest path", "Dates → apartment → reserve → dummy checkout → booked"),
        ("Live demo", "hotelz-bay.vercel.app"),
    ]
    for i, (k, v) in enumerate(rows):
        y = Inches(2.35 + i * 0.95)
        card(s, Inches(0.7), y, Inches(11.9), Inches(0.85))
        write(s, Inches(0.95), y + Inches(0.22), Inches(2.2), Inches(0.45), [{"text": k.upper(), "size": 13, "bold": True, "color": TEAL, "space_after": 0}])
        write(s, Inches(3.3), y + Inches(0.2), Inches(9), Inches(0.5), [{"text": v, "size": 18, "bold": True, "space_after": 0}])
    footer(s, 3, total)

    # 4 journey map
    s = prs.slides.add_slide(blank)
    bg(s)
    header(s)
    write(s, Inches(0.7), Inches(0.95), Inches(12), Inches(0.8), [{"text": "Five steps to a booking", "size": 36, "bold": True, "space_after": 0}])
    steps = [
        ("01", "Explore", "Headline, photos,\ndates and guests"),
        ("02", "Stays", "Availability, collage,\nmap on Ituna Road"),
        ("03", "Apartment", "Rooms, amenities,\nReserve"),
        ("04", "Pay", "Visa, Mastercard,\nAirtel, MTN MoMo"),
        ("05", "Booked", "Trip saved on\nthis device"),
    ]
    for i, (n, title, body) in enumerate(steps):
        left = Inches(0.55 + i * 2.52)
        card(s, left, Inches(2.25), Inches(2.35), Inches(3.7))
        write(s, left + Inches(0.2), Inches(2.5), Inches(2), Inches(0.5), [{"text": n, "size": 22, "bold": True, "color": TEAL, "space_after": 0}])
        write(s, left + Inches(0.2), Inches(3.15), Inches(2), Inches(0.7), [{"text": title, "size": 22, "bold": True, "space_after": 0}])
        write(s, left + Inches(0.2), Inches(3.9), Inches(2), Inches(1.5), [{"text": body, "size": 14, "color": MUTED, "space_after": 0}])
    footer(s, 4, total)

    # 5-8 screens
    screens = [
        (5, "01  Explore", "The home page is only this apartment. Guests pick dates and guests, then check availability.", "explore"),
        (6, "02  Stays", "Availability, photos, amenities, nightly rate, and the map pin on Ituna Road.", "stays"),
        (7, "03  The apartment", "Full description, what is included, and a reserve card with the stay total.", "stay"),
        (8, "04  Checkout", "Guest details plus a dummy pay step. Nothing is charged. The method name is saved.", "pay"),
    ]
    for n, title, body, key in screens:
        s = prs.slides.add_slide(blank)
        bg(s)
        header(s)
        write(s, Inches(0.55), Inches(0.9), Inches(12), Inches(0.55), [{"text": title, "size": 28, "bold": True, "space_after": 0}])
        write(s, Inches(0.55), Inches(1.4), Inches(12.2), Inches(0.5), [{"text": body, "size": 16, "color": MUTED, "space_after": 0}])
        add_round(s, Inches(0.55), Inches(1.95), Inches(12.2), Inches(4.95), LINE)
        add_image(s, shot(key), Inches(0.7), Inches(2.1), Inches(11.9), Inches(4.65))
        footer(s, n, total)

    # 9 payments
    s = prs.slides.add_slide(blank)
    bg(s)
    header(s)
    write(s, Inches(0.7), Inches(0.95), Inches(12), Inches(0.7), [{"text": "How Zambia guests pay", "size": 36, "bold": True, "space_after": 0}])
    write(s, Inches(0.7), Inches(1.65), Inches(12), Inches(0.5), [{"text": "Demo checkout only. Looks real. Does not take money.", "size": 18, "color": MUTED, "space_after": 0}])
    pays = [
        ("Visa", "Card"),
        ("Mastercard", "Card"),
        ("Airtel Money", "Mobile money"),
        ("MTN MoMo", "Mobile money"),
    ]
    for i, (name, kind) in enumerate(pays):
        left = Inches(0.7 + i * 3.1)
        card(s, left, Inches(2.5), Inches(2.9), Inches(3.2))
        add_round(s, left + Inches(0.9), Inches(2.85), Inches(1.1), Inches(1.1), TEAL if i < 2 else RGBColor(0xE4, 0x00, 0x2B) if i == 2 else RGBColor(0xFF, 0xCC, 0x00))
        write(s, left + Inches(0.2), Inches(4.2), Inches(2.5), Inches(1.1), [
            {"text": name, "size": 18, "bold": True, "align": PP_ALIGN.CENTER, "space_after": 6},
            {"text": kind, "size": 14, "color": MUTED, "align": PP_ALIGN.CENTER, "space_after": 0},
        ])
    footer(s, 9, total)

    # 10 what to say
    s = prs.slides.add_slide(blank)
    bg(s)
    header(s)
    write(s, Inches(0.7), Inches(0.95), Inches(12), Inches(0.7), [{"text": "Talking points", "size": 36, "bold": True, "space_after": 0}])
    points = [
        "This is the company’s own site, not a listing rented from Booking.com.",
        "The guest never leaves Kipling Court. Photos, map, and pay stay in one place.",
        "Checkout is a demo: Visa, Mastercard, Airtel Money, MTN MoMo — no charge.",
        "Next: real rates, WhatsApp confirmations, and a live payment provider.",
    ]
    for i, line in enumerate(points):
        y = Inches(1.95 + i * 1.05)
        card(s, Inches(0.7), y, Inches(11.9), Inches(0.9))
        add_round(s, Inches(0.95), y + Inches(0.22), Inches(0.46), Inches(0.46), TEAL)
        tb = s.shapes.add_textbox(Inches(0.97), y + Inches(0.26), Inches(0.42), Inches(0.4))
        fill_p(tb.text_frame.paragraphs[0], str(i + 1), 14, True, WHITE, PP_ALIGN.CENTER, 0)
        write(s, Inches(1.7), y + Inches(0.25), Inches(10.5), Inches(0.5), [{"text": line, "size": 18, "bold": True, "space_after": 0}])
    footer(s, 10, total)

    # 11 close
    s = prs.slides.add_slide(blank)
    bg(s, TEAL)
    write(s, Inches(0.9), Inches(2.0), Inches(11.5), Inches(1.8), [{"text": "Open the site. Walk the stay.\nShow the dummy pay.", "size": 40, "bold": True, "color": WHITE, "space_after": 0}])
    write(
        s,
        Inches(0.9),
        Inches(4.3),
        Inches(11),
        Inches(1.2),
        [
            {"text": "https://hotelz-bay.vercel.app", "size": 22, "bold": True, "color": WHITE, "space_after": 8},
            {"text": "Slideshow in the app  ·  /present", "size": 18, "color": RGBColor(0xD7, 0xEF, 0xE9), "space_after": 0},
        ],
    )

    prs.save(OUT)
    print(OUT)


if __name__ == "__main__":
    build()

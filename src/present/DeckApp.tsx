import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Reveal from './deck/Reveal';
import Bento from './components/Bento';
import Split from './components/Split';
import CountUp from './components/CountUp';
import StatGrid from './components/StatGrid';
import BrowserFrame from './components/BrowserFrame';
import Cover from './components/Cover';
import BigNumber from './components/BigNumber';
import Contrast from './components/Contrast';
import Steps from './components/Steps';

const amenity =
  'Free parking, Free Wifi, Kitchen, Hot tub, Balcony, Air conditioning, Daily housekeeping, 24-hour security'.split(
    ', '
  );

export function DeckApp() {
  return (
    <Deck>
      <Cover
        nav="Cover"
        notes="Open on the address. This deck is the live site at hotelz-bay.vercel.app — one apartment, booked on its own page."
        kicker="Fairview, Lusaka"
        title={
          <>
            Kipling <span className="accent-text">Court</span>
          </>
        }
        subtitle="The apartment, booked direct."
        image="/kipling/hero.jpg"
        foot="Apartment 3 · Ituna Road"
      />

      <Slide
        center
        nav="Direct"
        notes="The homepage line. Hold, then reveal the second sentence. The whole apartment is the product — not a hotel room."
      >
        <h2 className="headline" style={{ marginInline: 'auto' }}>
          Two bedrooms. One <span className="accent-text">house rate.</span>
        </h2>
        <Build at={1}>
          <p className="subhead" style={{ marginTop: 18 }}>
            Kitchen, balcony, parking, and the apartment itself — on Ituna Road.
          </p>
        </Build>
      </Slide>

      <Split
        nav="The stay"
        notes="About 100 square metres, sleeps 4. Queen plus two full beds, two bathrooms. The 9.8 is the listing score from 8 reviews — say the review count so it stays honest."
        kicker="The stay"
        title={
          <>
            The whole apartment. <span className="accent-text">Sleeps four.</span>
          </>
        }
        body="About 100 m². A queen bed, two full beds, two bathrooms with a walk-in shower and a bath, a kitchen, a sofa, and a balcony. Listed at 9.8 from 8 reviews."
        media={
          <img
            src="/kipling/bedroom.jpg"
            alt="Queen bedroom at Kipling Court, with air conditioning and a balcony door"
          />
        }
      />

      <Bento
        nav="Inside"
        notes="Let them scan. Living room, both bedrooms, kitchen, balcony — these are the listing photos."
        kicker="Inside"
        title="Rooms you can actually book."
        tiles={[
          { k: 'Living room', img: '/kipling/extra.jpg', c: 7, r: 2 },
          { k: 'Bedroom', img: '/kipling/bedroom.jpg', c: 5, r: 2 },
          { k: 'Second bedroom', img: '/kipling/bath.jpg', c: 4 },
          { k: 'Kitchen', img: '/kipling/balcony.jpg', c: 4 },
          { k: 'Balcony', img: '/kipling/living.jpg', c: 4 },
        ]}
      />

      <Slide
        center
        nav="Included"
        notes="Read two or three, not the whole list. Parking, kitchen, hot tub, and 24-hour security are the ones guests ask about."
      >
        <div className="kicker" style={{ marginBottom: 12 }}>
          Included
        </div>
        <h2 className="headline" style={{ marginInline: 'auto' }}>
          Ready when they arrive.
        </h2>
        <Build at={1}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
              gap: 12,
              maxWidth: 880,
              width: '100%',
              marginInline: 'auto',
              marginTop: 'clamp(22px, 4vh, 36px)',
            }}
          >
            {amenity.map((name) => (
              <div
                key={name}
                style={{
                  padding: '16px 18px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--hair)',
                  fontWeight: 650,
                  letterSpacing: '-0.02em',
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </Build>
      </Slide>

      <StatGrid
        nav="Fairview"
        notes="Museum is a 12-minute walk. Kenneth Kaunda International Airport is about 18 km. Check-in from 15:00, check-out by 10:00."
        kicker="Ituna Road"
        title="Fairview, on its own clock."
        stats={[
          {
            value: (
              <>
                <CountUp to={12} /> min
              </>
            ),
            label: 'On foot',
            caption: 'Lusaka National Museum',
          },
          {
            value: (
              <>
                <CountUp to={18} /> km
              </>
            ),
            label: 'From the door',
            caption: 'Kenneth Kaunda International',
          },
          {
            value: '15:00',
            label: 'Check-in',
            caption: 'From the afternoon',
          },
          {
            value: '10:00',
            label: 'Check-out',
            caption: 'By late morning',
          },
        ]}
      />

      <BigNumber
        nav="House rate"
        notes="Let $95 sit. Booking fee on the checkout is $0. Price is per night for the two-bedroom apartment, in US dollars, as the site formats it."
        kicker="House rate"
        value={<CountUp to={95} prefix="$" />}
        caption="a night, for the two-bedroom apartment."
        foot="Listed on Kipling Court · booking fee $0"
      />

      <Contrast
        nav="Booked direct"
        notes="Left is life without this page. Right is what the site actually does. Don't invent a marketplace fee."
        kicker="Booked direct"
        title="The rate is on the page."
        left={{
          label: 'Without this site',
          title: 'Ask, then wait',
          points: [
            'Dates live in a message thread',
            'The night’s price has to be requested',
            'Nothing is saved for arrival',
          ],
        }}
        right={{
          label: 'Kipling Court',
          title: 'Book it here',
          points: [
            'Check-in, check-out, and guests',
            '$95 a night, booking fee $0',
            'The trip is there at check-in',
          ],
        }}
      />

      <Steps
        nav="Journey"
        notes="Same path as the live site: Explore, the stay, checkout, Trips. Say out loud that checkout does not charge a card or a mobile-money account."
        kicker="Guest journey"
        title="From dates to a trip."
        items={[
          {
            title: 'Dates',
            body: 'Check-in, check-out, and how many people. The home page is this apartment.',
          },
          {
            title: 'The stay',
            body: 'Photos, the $95 rate, Wi-Fi, kitchen, hot tub, and the pin on Ituna Road.',
          },
          {
            title: 'Checkout',
            body: 'Name, email, phone, and an arrival note. Visa, Mastercard, Airtel Money, or MTN MoMo.',
          },
          {
            title: 'Trips',
            body: 'Dates, total, and the method they chose. Show that screen at check-in.',
          },
        ]}
      />

      <Slide
        center
        nav="The site"
        notes="Walk the bar: Explore, Stays, Trips. Then the search, then the $95 card. Offer to open hotelz-bay.vercel.app if you can."
      >
        <Reveal>
          <div className="kicker" style={{ marginBottom: 12 }}>
            The site
          </div>
          <h2
            className="headline"
            style={{
              marginInline: 'auto',
              marginBottom: 'clamp(16px, 3vh, 28px)',
            }}
          >
            Explore, stay, trip.
          </h2>
        </Reveal>
        <Reveal>
          <div style={{ maxWidth: 860, width: '100%', marginInline: 'auto' }}>
            <BrowserFrame url="hotelz-bay.vercel.app">
              <div
                className="appmock"
                style={{
                  minHeight: 'clamp(260px, 40vh, 360px)',
                  background: 'var(--bg)',
                  color: 'var(--fg)',
                  textAlign: 'left',
                }}
              >
                <div
                  className="hide-narrow"
                  style={{
                    borderRight: '1px solid var(--hair)',
                    background: 'var(--surface-2)',
                    padding: '16px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontWeight: 750,
                      color: 'var(--primary)',
                      padding: '4px 8px 12px',
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: 'var(--primary)',
                        color: 'var(--accent-ink)',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 14,
                      }}
                    >
                      K
                    </span>
                    Kipling Court
                  </div>
                  {['Explore', 'Stays', 'Trips'].map((n, i) => (
                    <div
                      key={n}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 999,
                        fontSize: 14,
                        fontWeight: i === 0 ? 700 : 500,
                        color: i === 0 ? 'var(--primary)' : 'var(--fg-muted)',
                        background:
                          i === 0
                            ? 'color-mix(in srgb, var(--primary) 14%, transparent)'
                            : 'transparent',
                      }}
                    >
                      {n}
                    </div>
                  ))}
                </div>
                <div style={{ padding: '18px 20px' }}>
                  <div
                    style={{
                      fontSize: 12,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      color: 'var(--fg-muted)',
                      marginBottom: 6,
                    }}
                  >
                    Fairview, Lusaka
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(18px, 2vw, 22px)',
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                      marginBottom: 14,
                    }}
                  >
                    The apartment, booked direct.
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(min(120px, 100%), 1fr))',
                      background: 'var(--surface-2)',
                      borderRadius: 14,
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow)',
                      marginBottom: 14,
                    }}
                  >
                    {[
                      ['Stay', 'Two-bedroom'],
                      ['Check-in', 'Pick a date'],
                      ['Check-out', 'After check-in'],
                      ['Guests', '2'],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        style={{
                          padding: '10px 14px',
                          borderRight: '1px solid var(--hair)',
                        }}
                      >
                        <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>
                          {k}
                        </div>
                        <div style={{ fontWeight: 650, fontSize: 14 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '96px 1fr',
                      gap: 12,
                      alignItems: 'center',
                      background: 'var(--surface-2)',
                      borderRadius: 14,
                      overflow: 'hidden',
                      border: '1px solid var(--hair)',
                    }}
                  >
                    <img
                      src="/kipling/hero.jpg"
                      alt=""
                      style={{ width: '100%', height: 72, objectFit: 'cover' }}
                    />
                    <div style={{ paddingRight: 12 }}>
                      <div style={{ fontWeight: 700 }}>Two-bedroom apartment</div>
                      <div style={{ color: 'var(--fg-muted)', fontSize: 13 }}>
                        Sleeps 4 · Fairview
                      </div>
                      <div style={{ fontWeight: 750, color: 'var(--primary)' }}>
                        $95 night
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BrowserFrame>
          </div>
        </Reveal>
      </Slide>

      <Slide
        center
        nav="Checkout"
        notes="Important: this is a demo checkout. No card and no Airtel or MTN account is charged. Only the method name is stored, on this device, under hotelz-bookings."
      >
        <div className="kicker" style={{ marginBottom: 12 }}>
          Checkout
        </div>
        <h2 className="headline" style={{ marginInline: 'auto' }}>
          A real form. <span className="accent-text">Nothing is charged.</span>
        </h2>
        <Build at={1}>
          <p className="lead" style={{ marginTop: 16 }}>
            Visa, Mastercard, Airtel Money, or MTN MoMo. Only the method name is
            saved.
          </p>
        </Build>
        <Build at={2}>
          <p className="subhead" style={{ marginTop: 14 }}>
            The reservation stays on this phone or computer, ready to show at
            check-in.
          </p>
        </Build>
      </Slide>

      <Slide
        center
        nav="Book"
        notes="Leave the URL up. Apartment 3, Ituna Road, Fairview. Invite them to set dates on the live site."
      >
        <Reveal>
          <div className="kicker" style={{ marginBottom: 14 }}>
            Fairview, Lusaka
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 7vw, 92px)' }}>
            Book the <span className="accent-text">apartment.</span>
          </h2>
          <p className="subhead" style={{ marginTop: 16 }}>
            hotelz-bay.vercel.app
          </p>
          <p className="foot" style={{ marginTop: 18 }}>
            Apartment 3, Ituna Road
          </p>
        </Reveal>
      </Slide>
    </Deck>
  );
}

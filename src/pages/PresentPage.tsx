import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    kicker: 'Kipling Court · guest journey',
    title: 'How a guest books the apartment',
    body: 'This slideshow is the walkthrough. The same steps are live on the website, ending in a demo checkout. No real card or mobile-money account is charged.',
  },
  {
    kicker: '1 · Explore',
    title: 'Pick dates and guests',
    body: 'The home page is only Kipling Court in Fairview. The guest sets check-in, check-out, and how many people, then checks those dates. There is no “where” search, because there is one apartment.',
  },
  {
    kicker: '2 · The stay',
    title: 'Photos, price, and the map',
    body: 'They see the listing photos, what is included (parking, Wi-Fi, kitchen, hot tub), and the pin on Ituna Road. They reserve the two-bedroom apartment.',
  },
  {
    kicker: '3 · Who is staying',
    title: 'Name, email, and phone',
    body: 'Checkout asks for the guest’s name, email, phone, and an optional note for arrival time. The stay total sits beside the form.',
  },
  {
    kicker: '4 · Dummy checkout',
    title: 'How people pay in Zambia',
    body: 'The guest picks one method. Cards: Visa or Mastercard. Mobile money: Airtel Money or MTN MoMo. The form looks like a real checkout. The site keeps only the method name, not the card number, and it does not take money.',
  },
  {
    kicker: '5 · Done',
    title: 'The booking is saved on this device',
    body: 'Trips shows “You’re booked”, the dates, the total, and which demo method they chose. That is the end of the journey you were asked to show.',
  },
]

export function PresentPage() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        setIndex((current) => Math.min(slides.length - 1, current + 1))
      }
      if (event.key === 'ArrowLeft') {
        setIndex((current) => Math.max(0, current - 1))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="present">
      <header>
        <strong>Kipling Court</strong>
        <span>
          {index + 1} / {slides.length}
        </span>
      </header>
      <article className="slide">
        <p className="kicker">{slide.kicker}</p>
        <h1>{slide.title}</h1>
        <p>{slide.body}</p>
      </article>
      <footer>
        <button type="button" onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0}>
          Back
        </button>
        {index === slides.length - 1 ? (
          <Link to="/">Open the live site</Link>
        ) : (
          <button type="button" onClick={() => setIndex((current) => current + 1)}>
            Next
          </button>
        )}
      </footer>
    </div>
  )
}

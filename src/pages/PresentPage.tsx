import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { properties } from '../data/properties'

const photos = properties[0].images

const slides = [
  {
    kicker: 'Guest journey',
    title: 'How a guest books Kipling Court',
    body: 'The same path as the live site, from dates to a dummy checkout. No card or mobile-money account is charged.',
    image: photos[0],
  },
  {
    kicker: '1 · Explore',
    title: 'Pick dates and guests',
    body: 'The home page is only this Fairview apartment. Guests set check-in, check-out, and how many people, then check those dates.',
    image: photos[1],
  },
  {
    kicker: '2 · The stay',
    title: 'Photos, price, and the map',
    body: 'They see the listing photos, parking, Wi-Fi, kitchen and hot tub, and the pin on Ituna Road. Then they reserve the two-bedroom apartment.',
    image: photos[2],
  },
  {
    kicker: '3 · Guest details',
    title: 'Name, email, and phone',
    body: 'Checkout asks who is staying, plus an optional note for arrival. The stay total sits beside the form.',
    image: photos[3],
  },
  {
    kicker: '4 · Pay',
    title: 'Visa, Mastercard, Airtel Money, MTN MoMo',
    body: 'Zambia guests usually pay by card or mobile money. The form looks like a real checkout. Only the method name is saved. Nothing is charged.',
    image: photos[4],
  },
  {
    kicker: '5 · Done',
    title: 'You’re booked',
    body: 'Trips shows the dates, the total, and which demo method they chose. That is the full journey.',
    image: photos[5],
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
      if (event.key === 'ArrowLeft') setIndex((current) => Math.max(0, current - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="present">
      <header>
        <Link to="/" className="brand">
          <span className="mark">K</span>
          Kipling Court
        </Link>
        <span className="muted">
          {index + 1} / {slides.length}
        </span>
      </header>
      <article className="slide">
        <figure>
          <img src={slide.image} alt="" />
        </figure>
        <div>
          <p className="eyebrow">{slide.kicker}</p>
          <h1>{slide.title}</h1>
          <p>{slide.body}</p>
        </div>
      </article>
      <footer>
        <button type="button" className="ghost" onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0}>
          Back
        </button>
        <div className="dots">
          {slides.map((_, i) => (
            <button key={i} type="button" className={i === index ? 'dot on' : 'dot'} onClick={() => setIndex(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        {index === slides.length - 1 ? (
          <Link className="button" to="/">
            Open the site
          </Link>
        ) : (
          <button type="button" className="button" onClick={() => setIndex((current) => current + 1)}>
            Next
          </button>
        )}
      </footer>
    </div>
  )
}

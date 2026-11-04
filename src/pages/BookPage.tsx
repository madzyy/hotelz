import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getProperty } from '../data/properties'
import { saveBooking } from '../lib/bookings'
import { formatDate, formatMoney, nightsBetween, readSearch } from '../lib/stay'

export function BookPage() {
  const { propertyId, roomId } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const stay = readSearch(params)
  const property = getProperty(propertyId ?? '')
  const room = property?.rooms.find((item) => item.id === roomId)
  const nights = nightsBetween(stay.checkIn, stay.checkOut)
  const [guestName, setGuestName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  if (!property || !room) {
    return (
      <main className="section">
        <h1>This room is not available.</h1>
        <Link to="/search">Back to search</Link>
      </main>
    )
  }

  const total = room.price * Math.max(nights, 0)

  function confirm(event: FormEvent) {
    event.preventDefault()
    if (!property || !room) return
    if (nights < 1) {
      setError('Those dates do not make a stay.')
      return
    }
    const booking = {
      id: crypto.randomUUID(),
      propertyId: property.id,
      roomId: room.id,
      checkIn: stay.checkIn,
      checkOut: stay.checkOut,
      guests: stay.guests,
      guestName: guestName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
      nights,
      total: room.price * nights,
      createdAt: new Date().toISOString(),
    }
    saveBooking(booking)
    navigate(`/trips?confirmed=${booking.id}`)
  }

  return (
    <main className="book">
      <div className="checkout-head">
        <Link className="back" to={`/stay/${property.id}?${params.toString()}`}>
          ← {property.name}
        </Link>
        <ol className="steps">
          <li className="done">Trip</li>
          <li className="current">Your details</li>
          <li>Confirm</li>
        </ol>
        <h1>Confirm and book</h1>
      </div>

      <form className="checkout" onSubmit={confirm}>
        <section className="sheet">
          <h2>Who’s staying</h2>
          <label>
            Full name
            <input value={guestName} onChange={(event) => setGuestName(event.target.value)} required autoComplete="name" />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
          </label>
          <label>
            Phone
            <input value={phone} onChange={(event) => setPhone(event.target.value)} required autoComplete="tel" />
          </label>
          <label>
            Message to the property
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} placeholder="Arrival time, extra bed, celebration…" />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button className="desk-submit" type="submit" disabled={nights < 1}>
            Confirm booking · {formatMoney(total)}
          </button>
          <p className="fine">This demo stores the reservation on this device. No card is charged.</p>
        </section>

        <aside className="summary">
          <img src={property.images[0]} alt="" />
          <div>
            <p className="muted">{property.kind} · {property.area}</p>
            <h2>{property.name}</h2>
            <p>{room.name}</p>
            <p className="muted">
              {formatDate(stay.checkIn)} – {formatDate(stay.checkOut)} · {stay.guests} guests
            </p>
          </div>
          <dl className="totals">
            <div>
              <dt>
                {formatMoney(room.price)} × {nights || 0} nights
              </dt>
              <dd>{formatMoney(total)}</dd>
            </div>
            <div>
              <dt>Booking fee</dt>
              <dd>{formatMoney(0)}</dd>
            </div>
            <div className="grand">
              <dt>Total</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
          </dl>
        </aside>
        <button className="confirm-bar" type="submit" disabled={nights < 1}>
          Confirm · {formatMoney(total)}
        </button>
      </form>
    </main>
  )
}

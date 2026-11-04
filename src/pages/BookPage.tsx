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
      <div>
        <p className="eyebrow">Request a stay</p>
        <h1>{property.name}</h1>
        <p>
          {room.name} · {formatDate(stay.checkIn)} to {formatDate(stay.checkOut)} · {stay.guests} guests
        </p>
        <img src={property.images[0]} alt="" />
        <dl className="totals">
          <div>
            <dt>
              {formatMoney(room.price)} × {nights || 0} nights
            </dt>
            <dd>{formatMoney(room.price * Math.max(nights, 0))}</dd>
          </div>
          <div>
            <dt>Booking fee</dt>
            <dd>{formatMoney(0)}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{formatMoney(room.price * Math.max(nights, 0))}</dd>
          </div>
        </dl>
      </div>
      <form onSubmit={confirm}>
        <label>
          Full name
          <input value={guestName} onChange={(event) => setGuestName(event.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          Phone
          <input value={phone} onChange={(event) => setPhone(event.target.value)} required />
        </label>
        <label>
          Notes for the property
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} />
        </label>
        {error ? <p className="form-error">{error}</p> : null}
        <button type="submit" disabled={nights < 1}>
          Confirm booking
        </button>
        <p className="fine">Saved on this device so the front desk demo can show the reservation. No card is charged.</p>
      </form>
    </main>
  )
}

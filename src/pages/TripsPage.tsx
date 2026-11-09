import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getProperty } from '../data/properties'
import { loadBookings } from '../lib/bookings'
import { formatDate, formatMoney } from '../lib/stay'

export function TripsPage() {
  const [params] = useSearchParams()
  const confirmed = params.get('confirmed')
  const [bookings] = useState(() => loadBookings())
  const booking = bookings.find((item) => item.id === confirmed) ?? bookings[0]
  const property = booking ? getProperty(booking.propertyId) : undefined
  const room = property?.rooms.find((item) => item.id === booking?.roomId)

  if (!booking || !property) {
    return (
      <main className="section">
        <div className="empty">
          <h1>No booking yet</h1>
          <p>Confirm a stay to see the receipt here.</p>
          <Link className="button" to="/search">
            Check dates
          </Link>
        </div>
      </main>
    )
  }

  const code = booking.id.slice(0, 8).toUpperCase()

  return (
    <main className="section confirm">
      <p className="confirm-badge">Confirmed</p>
      <h1>You’re booked</h1>
      <p className="lead">
        {booking.guestName}, Kipling Court is holding the apartment. Show this screen at check-in.
      </p>

      <article className="ticket">
        <div className="ticket-photos">
          {property.images.slice(0, 3).map((image) => (
            <img key={image} src={image} alt="" />
          ))}
        </div>
        <div className="ticket-body">
          <div className="ticket-head">
            <div>
              <p className="eyebrow">Fairview, Lusaka</p>
              <h2>{property.name}</h2>
              <p className="muted">
                {room?.name} · {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
              </p>
            </div>
            <p className="ref">
              Ref
              <strong>{code}</strong>
            </p>
          </div>
          <div className="ticket-dates">
            <div>
              <span>Check-in</span>
              <strong>{formatDate(booking.checkIn)}</strong>
              <p>From 15:00</p>
            </div>
            <div>
              <span>Check-out</span>
              <strong>{formatDate(booking.checkOut)}</strong>
              <p>By 10:00</p>
            </div>
          </div>
          <dl className="totals">
            <div>
              <dt>
                {booking.nights} {booking.nights === 1 ? 'night' : 'nights'}
              </dt>
              <dd>{formatMoney(booking.total)}</dd>
            </div>
            <div>
              <dt>Paid with</dt>
              <dd>{booking.payWith ?? 'Demo'}</dd>
            </div>
            <div className="grand">
              <dt>Total</dt>
              <dd>{formatMoney(booking.total)}</dd>
            </div>
          </dl>
          <div className="ticket-actions">
            <Link className="button" to={`/stay/${property.id}`}>
              View the apartment
            </Link>
            <Link className="ghost" to="/present">
              Journey slideshow
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}

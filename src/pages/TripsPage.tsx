import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getProperty } from '../data/properties'
import { loadBookings } from '../lib/bookings'
import { formatDate, formatMoney } from '../lib/stay'

export function TripsPage() {
  const [params] = useSearchParams()
  const confirmed = params.get('confirmed')
  const [bookings] = useState(() => loadBookings())
  const justBooked = bookings.find((booking) => booking.id === confirmed)

  return (
    <main className="section trips">
      <h1>{justBooked ? 'You’re booked' : 'Trips'}</h1>
      {justBooked ? (
        <p className="banner">
          {justBooked.guestName}, {getProperty(justBooked.propertyId)?.name ?? 'the property'} has this stay. Show this
          screen at check-in.
        </p>
      ) : (
        <p className="muted">Reservations saved on this phone or computer.</p>
      )}
      {bookings.length === 0 ? (
        <div className="empty">
          <h2>No trips yet</h2>
          <p>When you confirm a stay, it shows up here.</p>
          <Link className="button" to="/search">
            Start a search
          </Link>
        </div>
      ) : (
        <div className="trip-list">
          {bookings.map((booking) => {
            const property = getProperty(booking.propertyId)
            const room = property?.rooms.find((item) => item.id === booking.roomId)
            return (
              <article key={booking.id} className={booking.id === confirmed ? 'trip fresh' : 'trip'}>
                {property ? <img src={property.images[0]} alt="" /> : null}
                <div>
                  <p className="muted">{booking.id === confirmed ? 'Confirmed' : 'Upcoming'}</p>
                  <h2>{property?.name ?? 'Property'}</h2>
                  <p>
                    {room?.name ?? 'Room'} · {booking.guests} guests
                  </p>
                  <p className="muted">
                    {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)} · {booking.nights} nights
                  </p>
                  <p className="price">
                    <strong>{formatMoney(booking.total)}</strong> total
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </main>
  )
}

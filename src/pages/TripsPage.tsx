import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getProperty } from '../data/properties'
import { loadBookings } from '../lib/bookings'
import { formatDate, formatMoney } from '../lib/stay'

export function TripsPage() {
  const [params] = useSearchParams()
  const confirmed = params.get('confirmed')
  const [bookings] = useState(() => loadBookings())

  return (
    <main className="section">
      <h1>My bookings</h1>
      {confirmed ? <p className="banner">Booking received. The property has it on this browser.</p> : null}
      {bookings.length === 0 ? (
        <p className="empty">
          No stays yet. <Link to="/search">Find a hotel or lodge.</Link>
        </p>
      ) : (
        <div className="trip-list">
          {bookings.map((booking) => {
            const property = getProperty(booking.propertyId)
            const room = property?.rooms.find((item) => item.id === booking.roomId)
            return (
              <article key={booking.id} className={booking.id === confirmed ? 'trip fresh' : 'trip'}>
                {property ? <img src={property.images[0]} alt="" /> : null}
                <div>
                  <h2>{property?.name ?? 'Property'}</h2>
                  <p>
                    {room?.name ?? 'Room'} · {booking.guests} guests
                  </p>
                  <p>
                    {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)} · {booking.nights} nights
                  </p>
                  <p>{booking.guestName}</p>
                  <p className="price">{formatMoney(booking.total)}</p>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </main>
  )
}

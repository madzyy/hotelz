import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { PropertyMap } from '../components/PropertyMap'
import { getProperty } from '../data/properties'
import { formatMoney, nightsBetween, readSearch, searchParams } from '../lib/stay'

export function StayPage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const stay = readSearch(params)
  const property = getProperty(id ?? '')
  const [photo, setPhoto] = useState(0)

  if (!property) {
    return (
      <main className="section">
        <h1>That stay is not on our list.</h1>
        <Link to="/search">Back to search</Link>
      </main>
    )
  }

  const nights = nightsBetween(stay.checkIn, stay.checkOut)
  const rooms = property.rooms.filter((room) => room.sleeps >= stay.guests)

  return (
    <main className="stay">
      <p className="eyebrow">
        {property.kind} · {property.area}
      </p>
      <h1>{property.name}</h1>
      <p className="meta">
        {property.rating.toFixed(1)} from {property.reviews} guest reviews · {property.city}
      </p>

      <div className="gallery">
        <img src={property.images[photo]} alt="" />
        <div>
          {property.images.map((image, index) => (
            <button key={image} type="button" onClick={() => setPhoto(index)} aria-label={`Photo ${index + 1}`}>
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </div>

      <div className="stay-layout">
        <div>
          <p className="lead">{property.description}</p>
          <h2>Included on the property</h2>
          <ul className="amenity-list">
            {property.amenities.map((amenity) => (
              <li key={amenity}>{amenity}</li>
            ))}
          </ul>
          <h2>On the map</h2>
          <div className="map-panel single">
            <PropertyMap properties={[property]} stay={stay} />
          </div>
        </div>
        <aside className="book-panel">
          <h2>Choose a room</h2>
          <p>
            {nights > 0
              ? `${nights} night${nights === 1 ? '' : 's'} · ${stay.guests} guest${stay.guests === 1 ? '' : 's'}`
              : 'Pick valid dates to see a total.'}
          </p>
          {rooms.length === 0 ? (
            <p>No room sleeps {stay.guests}. Lower the guest count in search.</p>
          ) : (
            rooms.map((room) => (
              <article key={room.id}>
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <p>Sleeps {room.sleeps}</p>
                <p className="price">
                  {formatMoney(room.price)} <span>/ night</span>
                </p>
                {nights > 0 ? <p>Stay total {formatMoney(room.price * nights)}. No booking fee.</p> : null}
                <Link
                  className="button"
                  to={`/book/${property.id}/${room.id}?${searchParams(stay).toString()}`}
                >
                  Book this room
                </Link>
              </article>
            ))
          )}
        </aside>
      </div>
    </main>
  )
}

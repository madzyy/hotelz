import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { PropertyMap } from '../components/PropertyMap'
import { getProperty } from '../data/properties'
import { formatDate, formatMoney, nightsBetween, readSearch, searchParams } from '../lib/stay'

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
  const from = Math.min(...property.rooms.map((room) => room.price))

  return (
    <main className="stay">
      <Link className="back" to={`/search?${searchParams(stay).toString()}`}>
        ← Stays
      </Link>
      <div className="stay-title">
        <div>
          <h1>{property.name}</h1>
          <p className="muted">
            ★ {property.rating.toFixed(1)} · {property.reviews} reviews · {property.area}
          </p>
        </div>
        <p className="pill">{property.kind}</p>
      </div>

      <div className="gallery">
        <div className="film">
          {property.images.map((image) => (
            <img key={image} src={image} alt="" />
          ))}
        </div>
        <div className="thumbs">
          {property.images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={photo === index ? 'on' : ''}
              onClick={() => setPhoto(index)}
              aria-label={`Photo ${index + 1}`}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
        <img className="hero-photo" src={property.images[photo]} alt="" />
      </div>

      <div className="stay-layout">
        <div>
          <p className="lead">{property.description}</p>
          <h2>What this place offers</h2>
          <ul className="amenity-list">
            {property.amenities.map((amenity) => (
              <li key={amenity}>{amenity}</li>
            ))}
          </ul>
          <h2>Where you’ll be</h2>
          <p className="muted">{property.city}</p>
          <div className="map-panel single">
            <PropertyMap properties={[property]} stay={stay} />
          </div>
        </div>
        <aside className="book-panel" id="rooms">
          <p className="panel-price">
            <strong>{formatMoney(from)}</strong> night
          </p>
          <p className="muted">
            {formatDate(stay.checkIn)} – {formatDate(stay.checkOut)} · {stay.guests}{' '}
            {stay.guests === 1 ? 'guest' : 'guests'}
          </p>
          <h2>Rooms</h2>
          {rooms.length === 0 ? (
            <p>No room sleeps {stay.guests}. Lower the guest count and search again.</p>
          ) : (
            rooms.map((room) => (
              <article key={room.id} className="room">
                <div>
                  <h3>{room.name}</h3>
                  <p>{room.description}</p>
                  <p className="muted">Sleeps {room.sleeps}</p>
                </div>
                <div className="room-buy">
                  <p className="price">
                    <strong>{formatMoney(room.price)}</strong> night
                  </p>
                  {nights > 0 ? (
                    <p className="muted">
                      {formatMoney(room.price * nights)} for {nights} nights · no fee
                    </p>
                  ) : null}
                  <Link to={`/book/${property.id}/${room.id}?${searchParams(stay).toString()}`}>
                    Reserve
                  </Link>
                </div>
              </article>
            ))
          )}
        </aside>
      </div>

      <div className="reserve-bar">
        <div>
          <strong>{formatMoney(from)}</strong>
          <span> night · {nights > 0 ? `${nights} nights` : 'select dates'}</span>
        </div>
        <a href="#rooms">Choose a room</a>
      </div>
    </main>
  )
}

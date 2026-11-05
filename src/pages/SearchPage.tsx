import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PropertyMap } from '../components/PropertyMap'
import { SearchForm } from '../components/SearchForm'
import { fromPrice, properties } from '../data/properties'
import { formatDate, formatMoney, nightsBetween, readSearch, searchParams } from '../lib/stay'

export function SearchPage() {
  const [params] = useSearchParams()
  const stay = readSearch(params)
  const [mapOpen, setMapOpen] = useState(false)
  const property = properties[0]
  const nights = nightsBetween(stay.checkIn, stay.checkOut)
  const fits = stay.guests <= 4

  return (
    <main className={mapOpen ? 'search-page map-open' : 'search-page'}>
      <SearchForm key={params.toString()} initial={stay} compact />
      <div className="avail">
        <div>
          <p className="count">
            {fits ? 'Available for your dates' : 'This apartment sleeps 4'}
            {nights > 0 ? ` · ${nights} nights` : ''}
          </p>
          <article className="avail-card">
            <div className="avail-photos">
              {property.images.slice(0, 3).map((image) => (
                <img key={image} src={image} alt="" />
              ))}
            </div>
            <div className="avail-copy">
              <p className="muted">{property.area}</p>
              <h2>{property.name}</h2>
              <p>{property.summary}</p>
              <ul className="mini-amenity">
                {property.amenities.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="card-top">
                <p className="price">
                  <strong>{formatMoney(fromPrice(property))}</strong> night
                  {nights > 0 ? <span> · {formatMoney(fromPrice(property) * nights)} total</span> : null}
                </p>
                <span className="rating">★ {property.rating.toFixed(1)}</span>
              </div>
              {fits ? (
                <Link className="button" to={`/stay/${property.id}?${searchParams(stay).toString()}`}>
                  View apartment
                </Link>
              ) : (
                <p className="fine">Lower the guest count to 4 or fewer to book.</p>
              )}
            </div>
          </article>
        </div>
        <div className="map-stack">
          <div className="map-panel">
            <button type="button" className="map-close" onClick={() => setMapOpen(false)}>
              Show stay
            </button>
            <PropertyMap properties={[property]} stay={stay} />
          </div>
          <p className="map-caption">Apartment 3, Ituna Road · {formatDate(stay.checkIn)} to {formatDate(stay.checkOut)}</p>
        </div>
      </div>
      <button type="button" className="map-fab" onClick={() => setMapOpen(true)}>
        Map
      </button>
    </main>
  )
}

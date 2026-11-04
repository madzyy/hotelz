import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PropertyMap } from '../components/PropertyMap'
import { SearchForm } from '../components/SearchForm'
import { fromPrice, properties } from '../data/properties'
import { formatMoney, readSearch, searchParams } from '../lib/stay'

export function SearchPage() {
  const [params] = useSearchParams()
  const stay = readSearch(params)
  const [maxPrice, setMaxPrice] = useState(450)
  const [mapOpen, setMapOpen] = useState(false)

  const results = useMemo(() => {
    return properties.filter((property) =>
      property.rooms.some((room) => room.sleeps >= stay.guests && room.price <= maxPrice),
    )
  }, [stay.guests, maxPrice])

  return (
    <main className={mapOpen ? 'search-page map-open' : 'search-page'}>
      <SearchForm key={params.toString()} initial={stay} compact />
      <div className="filters">
        <span className="chip on">Apartment · sleeps 4</span>
        <label className="price-filter">
          Up to {formatMoney(maxPrice)}
          <input
            type="range"
            min={80}
            max={450}
            step={10}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="results">
        <div>
          <p className="count">
            {results.length} {results.length === 1 ? 'stay' : 'stays'} · {stay.guests}{' '}
            {stay.guests === 1 ? 'guest' : 'guests'}
          </p>
          {results.length === 0 ? (
            <p className="empty">Nothing matches. Raise the price or clear the place name.</p>
          ) : (
            <div className="result-list">
              {results.map((property) => (
                <Link
                  key={property.id}
                  className="result"
                  to={`/stay/${property.id}?${searchParams(stay).toString()}`}
                >
                  <img src={property.images[0]} alt="" />
                  <div>
                    <p className="muted">
                      {property.kind} · {property.area}
                    </p>
                    <h2>{property.name}</h2>
                    <p className="result-summary">{property.summary}</p>
                    <div className="card-top">
                      <p className="price">
                        <strong>{formatMoney(fromPrice(property))}</strong> night
                      </p>
                      <span className="rating">★ {property.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="map-panel">
          <button type="button" className="map-close" onClick={() => setMapOpen(false)}>
            Show list
          </button>
          <PropertyMap properties={results} stay={stay} />
        </div>
      </div>
      <button type="button" className="map-fab" onClick={() => setMapOpen(true)}>
        Map
      </button>
    </main>
  )
}

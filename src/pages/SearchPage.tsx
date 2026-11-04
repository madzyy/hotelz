import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PropertyMap } from '../components/PropertyMap'
import { SearchForm } from '../components/SearchForm'
import { fromPrice, properties } from '../data/properties'
import { formatMoney, readSearch, searchParams } from '../lib/stay'

export function SearchPage() {
  const [params] = useSearchParams()
  const stay = readSearch(params)
  const [kind, setKind] = useState<'all' | 'hotel' | 'lodge'>('all')
  const [maxPrice, setMaxPrice] = useState(450)
  const [showMap, setShowMap] = useState(true)

  const results = useMemo(() => {
    const needle = stay.destination.trim().toLowerCase()
    return properties.filter((property) => {
      const text = `${property.name} ${property.city} ${property.area}`.toLowerCase()
      const matchesPlace = !needle || text.includes(needle)
      const fitsGuests = property.rooms.some((room) => room.sleeps >= stay.guests && room.price <= maxPrice)
      const matchesKind = kind === 'all' || property.kind === kind
      return matchesPlace && fitsGuests && matchesKind
    })
  }, [stay.destination, stay.guests, kind, maxPrice])

  return (
    <main className="search-page">
      <SearchForm key={params.toString()} initial={stay} compact />
      <div className="filters">
        <label>
          Type
          <select value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}>
            <option value="all">Hotels and lodges</option>
            <option value="hotel">Hotels</option>
            <option value="lodge">Lodges</option>
          </select>
        </label>
        <label>
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
        <button type="button" className="ghost" onClick={() => setShowMap((open) => !open)}>
          {showMap ? 'Hide map' : 'Show map'}
        </button>
      </div>

      <div className={showMap ? 'results with-map' : 'results'}>
        <div>
          <p className="count">
            {results.length} {results.length === 1 ? 'stay' : 'stays'} for {stay.guests}{' '}
            {stay.guests === 1 ? 'guest' : 'guests'}
          </p>
          {results.length === 0 ? (
            <p className="empty">Nothing matches those filters. Widen the price or clear the place name.</p>
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
                    <p className="kind">{property.kind}</p>
                    <h2>{property.name}</h2>
                    <p>{property.summary}</p>
                    <p className="meta">
                      {property.area} · {property.rating.toFixed(1)} · {property.reviews} reviews
                    </p>
                    <p className="price">
                      From {formatMoney(fromPrice(property))} <span>/ night</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        {showMap ? (
          <div className="map-panel">
            <PropertyMap properties={results} stay={stay} />
          </div>
        ) : null}
      </div>
    </main>
  )
}

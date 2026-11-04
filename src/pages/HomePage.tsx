import { Link } from 'react-router-dom'
import { SearchForm } from '../components/SearchForm'
import { properties, fromPrice } from '../data/properties'
import { defaultStay, formatMoney, searchParams } from '../lib/stay'

export function HomePage() {
  const stay = defaultStay()

  return (
    <main className="home">
      <section className="home-intro">
        <div className="hero-copy">
          <p className="eyebrow">Book direct</p>
          <h1>Stay with the group. Skip the booking fee.</h1>
          <p>Search the hotels and lodges we operate, then reserve at the house rate.</p>
        </div>
        <figure className="hero-frame">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80"
            alt="Hotel pool and rooms in warm evening light"
          />
        </figure>
      </section>
      <SearchForm initial={stay} />

      <section className="section">
        <div className="section-head">
          <h2>Places we host</h2>
        </div>
        <div className="place-row">
          {properties.map((property) => (
            <Link
              key={property.id}
              className="place"
              to={`/search?${searchParams({ ...stay, destination: property.city }).toString()}`}
            >
              <img src={property.images[0]} alt="" />
              <span>{property.city}</span>
            </Link>
          ))}
        </div>

        <div className="section-head">
          <h2>Hotels and lodges</h2>
          <Link to="/search">See all</Link>
        </div>
        <div className="card-grid">
          {properties.map((property) => (
            <Link
              key={property.id}
              className="stay-card"
              to={`/stay/${property.id}?${searchParams(stay).toString()}`}
            >
              <img src={property.images[0]} alt="" />
              <div className="card-body">
                <div className="card-top">
                  <h3>{property.name}</h3>
                  <span className="rating">★ {property.rating.toFixed(1)}</span>
                </div>
                <p className="muted">{property.area}</p>
                <p className="price">
                  <strong>{formatMoney(fromPrice(property))}</strong> night
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

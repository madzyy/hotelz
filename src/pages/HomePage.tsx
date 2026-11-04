import { Link } from 'react-router-dom'
import { SearchForm } from '../components/SearchForm'
import { fromPrice, properties } from '../data/properties'
import { defaultStay, formatMoney, searchParams } from '../lib/stay'

export function HomePage() {
  const stay = defaultStay()
  const home = properties[0]

  return (
    <main className="home">
      <section className="home-intro">
        <div className="hero-copy">
          <p className="eyebrow">Fairview, Lusaka</p>
          <h1>Kipling Court. The apartment, booked direct.</h1>
          <p>Two bedrooms on Ituna Road. Kitchen, balcony, parking, and the house rate.</p>
        </div>
        <figure className="hero-frame">
          <img src={home.images[0]} alt="Kipling Court in Fairview, Lusaka" />
        </figure>
      </section>
      <SearchForm initial={stay} />

      <section className="section">
        <div className="section-head">
          <h2>Inside the apartment</h2>
        </div>
        <div className="place-row">
          {home.images.slice(1, 7).map((image, index) => (
            <Link
              key={image}
              className="place"
              to={`/stay/${home.id}?${searchParams(stay).toString()}`}
            >
              <img src={image} alt="" />
              <span>{['Living room', 'Bedroom', 'Kitchen', 'Bathroom', 'Balcony', 'Details'][index]}</span>
            </Link>
          ))}
        </div>

        <div className="section-head">
          <h2>The stay</h2>
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

import { Link } from 'react-router-dom'
import { SearchForm } from '../components/SearchForm'
import { properties, fromPrice } from '../data/properties'
import { defaultStay, formatMoney, searchParams } from '../lib/stay'

const places = ['Victoria Falls', 'Hwange', 'Kariba', 'Harare', 'Nyanga', 'Bulawayo']

export function HomePage() {
  const stay = defaultStay()

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Direct from the group</p>
          <h1>Hotels and lodges, booked without the commission.</h1>
          <p>
            Hotelz is the company’s own stay site. Search the properties we actually operate, see them on the map,
            and pay the house rate.
          </p>
        </div>
        <SearchForm initial={stay} />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Where we host</h2>
          <Link to="/search">Browse the map</Link>
        </div>
        <div className="chips">
          {places.map((place) => (
            <Link key={place} to={`/search?${searchParams({ ...stay, destination: place }).toString()}`}>
              {place}
            </Link>
          ))}
        </div>
        <div className="card-grid">
          {properties.map((property) => (
            <Link
              key={property.id}
              className="stay-card"
              to={`/stay/${property.id}?${searchParams(stay).toString()}`}
            >
              <img src={property.images[0]} alt="" />
              <div>
                <p className="kind">{property.kind}</p>
                <h3>{property.name}</h3>
                <p>{property.area}</p>
                <p className="price">
                  From {formatMoney(fromPrice(property))} <span>/ night</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

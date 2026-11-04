import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="shell">
      <header className="topbar">
        <Link to="/" className="brand">
          Hotelz
        </Link>
        <nav>
          <Link to="/search">Stays</Link>
          <Link to="/trips">My bookings</Link>
        </nav>
      </header>
      <Outlet />
      <footer className="site-footer">
        <div>
          <strong>Hotelz</strong>
          <p>Direct bookings for the group’s hotels and lodges. The room rate is the rate you pay.</p>
        </div>
        <p>Maps by OpenStreetMap contributors.</p>
      </footer>
    </div>
  )
}

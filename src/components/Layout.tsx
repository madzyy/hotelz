import { NavLink, Outlet } from 'react-router-dom'

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

const icons = {
  explore: 'M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z',
  stays: 'M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 11h16v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM4 11l1.2-3.2A2 2 0 0 1 7.1 6.5h9.8a2 2 0 0 1 1.9 1.3L20 11',
  trips: 'M8 3v3M16 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z',
}

export function Layout() {
  return (
    <div className="shell">
      <header className="topbar">
        <div className="bar">
          <NavLink to="/" className="brand" end>
            <span className="mark">K</span>
            Kipling Court
          </NavLink>
          <nav className="desk-nav">
            <NavLink to="/" end>
              <Icon d={icons.explore} />
              Explore
            </NavLink>
            <NavLink to="/search">
              <Icon d={icons.stays} />
              Stays
            </NavLink>
            <NavLink to="/trips">
              <Icon d={icons.trips} />
              Trips
            </NavLink>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="site-footer">
        <strong>Kipling Court</strong>
        <p>Direct bookings for the Fairview apartment. Apartment 3, Ituna Road, Lusaka.</p>
        <p>
          <a href="/present">Journey slideshow</a>
        </p>
      </footer>
      <nav className="tabbar">
        <NavLink to="/" end>
          <Icon d={icons.explore} />
          Explore
        </NavLink>
        <NavLink to="/search">
          <Icon d={icons.stays} />
          Stays
        </NavLink>
        <NavLink to="/trips">
          <Icon d={icons.trips} />
          Trips
        </NavLink>
      </nav>
    </div>
  )
}

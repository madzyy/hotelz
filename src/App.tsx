import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BookPage } from './pages/BookPage'
import { HomePage } from './pages/HomePage'
import { SearchPage } from './pages/SearchPage'
import { StayPage } from './pages/StayPage'
import { TripsPage } from './pages/TripsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="stay/:id" element={<StayPage />} />
        <Route path="book/:propertyId/:roomId" element={<BookPage />} />
        <Route path="trips" element={<TripsPage />} />
      </Route>
    </Routes>
  )
}

import type { Booking } from '../types'

const KEY = 'hotelz-bookings'

export function loadBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Booking[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveBooking(booking: Booking) {
  const next = [booking]
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

export type PropertyKind = 'hotel' | 'lodge'

export type Room = {
  id: string
  name: string
  sleeps: number
  price: number
  description: string
}

export type Property = {
  id: string
  name: string
  kind: PropertyKind
  area: string
  city: string
  summary: string
  description: string
  lat: number
  lng: number
  rating: number
  reviews: number
  amenities: string[]
  images: string[]
  rooms: Room[]
}

export type SearchQuery = {
  destination: string
  checkIn: string
  checkOut: string
  guests: number
}

export type Booking = {
  id: string
  propertyId: string
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
  guestName: string
  email: string
  phone: string
  notes: string
  nights: number
  total: number
  createdAt: string
}

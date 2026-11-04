import type { SearchQuery } from '../types'

function iso(date: Date) {
  return date.toISOString().slice(0, 10)
}

export function defaultStay(): SearchQuery {
  const checkIn = new Date()
  checkIn.setDate(checkIn.getDate() + 7)
  const checkOut = new Date(checkIn)
  checkOut.setDate(checkOut.getDate() + 2)
  return {
    checkIn: iso(checkIn),
    checkOut: iso(checkOut),
    guests: 2,
  }
}

export function nightsBetween(checkIn: string, checkOut: string) {
  const start = new Date(`${checkIn}T00:00:00`)
  const end = new Date(`${checkOut}T00:00:00`)
  const nights = Math.round((end.getTime() - start.getTime()) / 86_400_000)
  return Number.isFinite(nights) && nights > 0 ? nights : 0
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))
}

export function readSearch(params: URLSearchParams): SearchQuery {
  const fallback = defaultStay()
  const guests = Number(params.get('guests') ?? fallback.guests)
  return {
    checkIn: params.get('checkIn') || fallback.checkIn,
    checkOut: params.get('checkOut') || fallback.checkOut,
    guests: Number.isFinite(guests) && guests > 0 ? guests : fallback.guests,
  }
}

export function searchParams(query: SearchQuery) {
  const params = new URLSearchParams()
  params.set('checkIn', query.checkIn)
  params.set('checkOut', query.checkOut)
  params.set('guests', String(query.guests))
  return params
}

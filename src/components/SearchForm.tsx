import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { SearchQuery } from '../types'
import { nightsBetween, searchParams } from '../lib/stay'

type Props = {
  initial: SearchQuery
  compact?: boolean
}

export function SearchForm({ initial, compact = false }: Props) {
  const navigate = useNavigate()
  const [query, setQuery] = useState(initial)
  const [error, setError] = useState('')

  function update<K extends keyof SearchQuery>(key: K, value: SearchQuery[K]) {
    setQuery((current) => ({ ...current, [key]: value }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (nightsBetween(query.checkIn, query.checkOut) < 1) {
      setError('Check-out has to be after check-in.')
      return
    }
    setError('')
    navigate(`/search?${searchParams(query).toString()}`)
  }

  return (
    <form className={compact ? 'search compact' : 'search'} onSubmit={submit}>
      <label>
        <span>Where</span>
        <input
          value={query.destination}
          placeholder="Victoria Falls, Hwange, Harare…"
          onChange={(event) => update('destination', event.target.value)}
        />
      </label>
      <label>
        <span>Check-in</span>
        <input
          type="date"
          value={query.checkIn}
          onChange={(event) => update('checkIn', event.target.value)}
          required
        />
      </label>
      <label>
        <span>Check-out</span>
        <input
          type="date"
          value={query.checkOut}
          min={query.checkIn}
          onChange={(event) => update('checkOut', event.target.value)}
          required
        />
      </label>
      <label>
        <span>Guests</span>
        <input
          type="number"
          min={1}
          max={8}
          value={query.guests}
          onChange={(event) => update('guests', Number(event.target.value))}
        />
      </label>
      <button type="submit">Search stays</button>
      {error ? <p className="form-error">{error}</p> : null}
    </form>
  )
}

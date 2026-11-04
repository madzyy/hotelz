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
      <label className="where">
        <span>Where</span>
        <input
          value={query.destination}
          placeholder="Search hotels and lodges"
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
      <label className="guests">
        <span>Guests</span>
        <div className="stepper">
          <button
            type="button"
            aria-label="Fewer guests"
            onClick={() => update('guests', Math.max(1, query.guests - 1))}
          >
            −
          </button>
          <strong>{query.guests}</strong>
          <button
            type="button"
            aria-label="More guests"
            onClick={() => update('guests', Math.min(8, query.guests + 1))}
          >
            +
          </button>
        </div>
      </label>
      <button className="search-go" type="submit">
        Search
      </button>
      {error ? <p className="form-error">{error}</p> : null}
    </form>
  )
}

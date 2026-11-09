import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AirtelMark, ChipMark, MastercardMark, MtnMark, VisaMark } from '../components/PayMarks'
import { getProperty } from '../data/properties'
import { saveBooking } from '../lib/bookings'
import { formatDate, formatMoney, nightsBetween, readSearch } from '../lib/stay'

function prettyCard(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

function prettyExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function BookPage() {
  const { propertyId, roomId } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const stay = readSearch(params)
  const property = getProperty(propertyId ?? '')
  const room = property?.rooms.find((item) => item.id === roomId)
  const nights = nightsBetween(stay.checkIn, stay.checkOut)
  const [guestName, setGuestName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [payWith, setPayWith] = useState<'visa' | 'mastercard' | 'airtel' | 'mtn'>('visa')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [momoPhone, setMomoPhone] = useState('')
  const [error, setError] = useState('')

  if (!property || !room) {
    return (
      <main className="section">
        <h1>This room is not available.</h1>
        <Link to="/search">Back to search</Link>
      </main>
    )
  }

  const total = room.price * Math.max(nights, 0)

  function confirm(event: FormEvent) {
    event.preventDefault()
    if (!property || !room) return
    if (nights < 1) {
      setError('Those dates do not make a stay.')
      return
    }
    const card = payWith === 'visa' || payWith === 'mastercard'
    if (card) {
      const digits = cardNumber.replace(/\s/g, '')
      if (cardName.trim().length < 2 || digits.length < 15 || !/^\d{2}\/\d{2}$/.test(prettyExpiry(expiry)) || cvc.replace(/\D/g, '').length < 3) {
        setError('Fill the demo card fields. Nothing is charged or stored.')
        return
      }
    } else if (momoPhone.trim().length < 9) {
      setError('Enter the mobile-money number for this demo.')
      return
    }
    const labels = {
      visa: 'Visa (demo)',
      mastercard: 'Mastercard (demo)',
      airtel: 'Airtel Money (demo)',
      mtn: 'MTN Mobile Money (demo)',
    }
    const booking = {
      id: crypto.randomUUID(),
      propertyId: property.id,
      roomId: room.id,
      checkIn: stay.checkIn,
      checkOut: stay.checkOut,
      guests: stay.guests,
      guestName: guestName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
      payWith: labels[payWith],
      nights,
      total: room.price * nights,
      createdAt: new Date().toISOString(),
    }
    saveBooking(booking)
    navigate(`/trips?confirmed=${booking.id}`)
  }

  return (
    <main className="book">
      <div className="checkout-head">
        <Link className="back" to={`/stay/${property.id}?${params.toString()}`}>
          ← {property.name}
        </Link>
        <ol className="steps">
          <li className="done">Trip</li>
          <li className="current">Pay</li>
          <li>Done</li>
        </ol>
        <h1>Confirm and book</h1>
      </div>

      <form className="checkout" onSubmit={confirm}>
        <section className="sheet">
          <h2>Who’s staying</h2>
          <label>
            Full name
            <input value={guestName} onChange={(event) => setGuestName(event.target.value)} required autoComplete="name" />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
          </label>
          <label>
            Phone
            <input value={phone} onChange={(event) => setPhone(event.target.value)} required autoComplete="tel" />
          </label>
          <label>
            Message to the property
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} placeholder="Arrival time, extra bed, celebration…" />
          </label>
          <h2>How you’ll pay</h2>
          <p className="fine">Demo checkout. Pick a card or Zambian mobile money. Nothing is charged.</p>
          <div className="pay-grid">
            <button type="button" className={payWith === 'visa' ? 'pay on' : 'pay'} onClick={() => setPayWith('visa')}>
              <VisaMark />
              Visa
            </button>
            <button type="button" className={payWith === 'mastercard' ? 'pay on' : 'pay'} onClick={() => setPayWith('mastercard')}>
              <MastercardMark />
              Mastercard
            </button>
            <button type="button" className={payWith === 'airtel' ? 'pay on' : 'pay'} onClick={() => setPayWith('airtel')}>
              <AirtelMark />
              Airtel Money
            </button>
            <button type="button" className={payWith === 'mtn' ? 'pay on' : 'pay'} onClick={() => setPayWith('mtn')}>
              <MtnMark />
              MTN MoMo
            </button>
          </div>
          {payWith === 'visa' || payWith === 'mastercard' ? (
            <>
              <div className={payWith === 'visa' ? 'plastic visa' : 'plastic master'}>
                <div className="plastic-top">
                  <ChipMark />
                  {payWith === 'visa' ? <VisaMark /> : <MastercardMark />}
                </div>
                <p className="plastic-num">{prettyCard(cardNumber) || '•••• •••• •••• ••••'}</p>
                <div className="plastic-bottom">
                  <span>{cardName.trim() || 'Name on card'}</span>
                  <span>{expiry || 'MM/YY'}</span>
                </div>
              </div>
              <label>
                Name on card
                <input value={cardName} onChange={(event) => setCardName(event.target.value)} autoComplete="off" />
              </label>
              <label>
                Card number
                <input
                  inputMode="numeric"
                  placeholder="ACCT-000015"
                  value={prettyCard(cardNumber)}
                  onChange={(event) => setCardNumber(event.target.value)}
                  autoComplete="off"
                />
              </label>
              <div className="split-fields">
                <label>
                  Expiry
                  <input
                    placeholder="MM/YY"
                    inputMode="numeric"
                    maxLength={5}
                    value={expiry}
                    onChange={(event) => setExpiry(prettyExpiry(event.target.value))}
                    autoComplete="off"
                  />
                </label>
                <label>
                  CVC
                  <input inputMode="numeric" placeholder="123" value={cvc} onChange={(event) => setCvc(event.target.value)} autoComplete="off" />
                </label>
              </div>
            </>
          ) : (
            <div className={payWith === 'airtel' ? 'wallet airtel' : 'wallet mtn'}>
              <div className="wallet-brand">{payWith === 'airtel' ? <AirtelMark /> : <MtnMark />}</div>
              <p>Pay from your {payWith === 'airtel' ? 'Airtel Money' : 'MTN MoMo'} wallet</p>
              <label>
                {payWith === 'airtel' ? 'Airtel number' : 'MTN number'}
                <input
                  inputMode="tel"
                  placeholder="097…"
                  value={momoPhone}
                  onChange={(event) => setMomoPhone(event.target.value)}
                  autoComplete="off"
                />
              </label>
            </div>
          )}
          {error ? <p className="form-error">{error}</p> : null}
          <button className="desk-submit" type="submit" disabled={nights < 1}>
            Confirm booking · {formatMoney(total)}
          </button>
          <p className="fine">This demo stores the reservation on this device. No card is charged.</p>
        </section>

        <aside className="summary">
          <div className="summary-film">
            {property.images.slice(0, 3).map((image) => (
              <img key={image} src={image} alt="" />
            ))}
          </div>
          <div>
            <p className="muted">{property.kind} · {property.area}</p>
            <h2>{property.name}</h2>
            <p>{room.name}</p>
            <p className="muted">
              {formatDate(stay.checkIn)} – {formatDate(stay.checkOut)} · {stay.guests} guests
            </p>
          </div>
          <dl className="totals">
            <div>
              <dt>
                {formatMoney(room.price)} × {nights || 0} nights
              </dt>
              <dd>{formatMoney(total)}</dd>
            </div>
            <div>
              <dt>Booking fee</dt>
              <dd>{formatMoney(0)}</dd>
            </div>
            <div className="grand">
              <dt>Total</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
          </dl>
        </aside>
        <button className="confirm-bar" type="submit" disabled={nights < 1}>
          Confirm · {formatMoney(total)}
        </button>
      </form>
    </main>
  )
}

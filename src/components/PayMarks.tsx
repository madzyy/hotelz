export function VisaMark() {
  return (
    <svg viewBox="0 0 72 24" className="brand-mark" aria-hidden>
      <text x="2" y="19" fontFamily="Arial Black, sans-serif" fontSize="20" fontStyle="italic" fill="#1a1f71">
        VISA
      </text>
    </svg>
  )
}

export function MastercardMark() {
  return (
    <svg viewBox="0 0 56 36" className="brand-mark circles" aria-hidden>
      <circle cx="22" cy="18" r="14" fill="#eb001b" />
      <circle cx="34" cy="18" r="14" fill="#f79e1b" />
      <path d="M28 7.4a14 14 0 0 1 0 21.2 14 14 0 0 1 0-21.2z" fill="#ff5f00" />
    </svg>
  )
}

export function AirtelMark() {
  return (
    <svg viewBox="0 0 56 36" className="brand-mark" aria-hidden>
      <rect width="56" height="36" rx="8" fill="#e4002b" />
      <text x="28" y="16" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="800" fontFamily="Arial, sans-serif">
        airtel
      </text>
      <text x="28" y="28" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="Arial, sans-serif">
        Money
      </text>
    </svg>
  )
}

export function MtnMark() {
  return (
    <svg viewBox="0 0 56 36" className="brand-mark" aria-hidden>
      <rect width="56" height="36" rx="8" fill="#ffcc00" />
      <text x="28" y="16" textAnchor="middle" fill="#004f71" fontSize="11" fontWeight="900" fontFamily="Arial, sans-serif">
        MTN
      </text>
      <text x="28" y="28" textAnchor="middle" fill="#004f71" fontSize="7" fontFamily="Arial, sans-serif">
        MoMo
      </text>
    </svg>
  )
}

export function ChipMark() {
  return (
    <svg viewBox="0 0 40 30" className="chip" aria-hidden>
      <rect width="40" height="30" rx="6" fill="#e6c36a" />
      <path d="M8 8h24M8 15h24M8 22h24M16 8v14M24 8v14" stroke="#c9a24a" strokeWidth="1.4" />
    </svg>
  )
}

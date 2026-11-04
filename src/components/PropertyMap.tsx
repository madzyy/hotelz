import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'
import type { Property, SearchQuery } from '../types'
import { fromPrice } from '../data/properties'
import { formatMoney, searchParams } from '../lib/stay'

const pin = L.divIcon({
  className: 'pin-wrap',
  html: '<span class="pin"></span>',
  iconSize: [22, 22],
  iconAnchor: [11, 22],
})

function Frame({ pointsKey }: { pointsKey: string }) {
  const map = useMap()

  useEffect(() => {
    if (!pointsKey) return
    const points = pointsKey.split('|').map((pair) => pair.split(',').map(Number) as [number, number])
    if (points.length === 1) {
      map.setView(points[0], 12)
      return
    }
    map.fitBounds(points, { padding: [36, 36] })
  }, [map, pointsKey])

  return null
}

type Props = {
  properties: Property[]
  stay: SearchQuery
}

export function PropertyMap({ properties, stay }: Props) {
  const points = properties.map((property) => [property.lat, property.lng] as [number, number])
  const center = points[0] ?? ([-18.5, 29.5] as [number, number])

  return (
    <MapContainer center={center} zoom={6} scrollWheelZoom className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Frame pointsKey={points.map((point) => point.join(',')).join('|')} />
      {properties.map((property) => (
        <Marker key={property.id} position={[property.lat, property.lng]} icon={pin}>
          <Popup>
            <strong>{property.name}</strong>
            <br />
            {property.area}
            <br />
            From {formatMoney(fromPrice(property))} / night
            <br />
            <Link to={`/stay/${property.id}?${searchParams(stay).toString()}`}>View stay</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

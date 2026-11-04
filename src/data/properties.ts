import type { Property } from '../types'

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`

export const properties: Property[] = [
  {
    id: 'zambezi-view',
    name: 'Zambezi View Hotel',
    kind: 'hotel',
    area: 'Victoria Falls',
    city: 'Victoria Falls',
    summary: 'City hotel a short walk from the falls, with a pool deck and direct rates.',
    description:
      'Zambezi View is Hotelz’s town hotel in Victoria Falls. Rooms face the river gorge or the garden. Guests book the spray walk, sundowners, and airport pickup with the front desk — no third-party fee on the room.',
    lat: -17.9244,
    lng: 25.8567,
    rating: 4.7,
    reviews: 186,
    amenities: ['Pool', 'Breakfast', 'Wifi', 'Restaurant', 'Airport pickup'],
    images: [
      photo('photo-1566073771259-6a8506099945'),
      photo('photo-1551882547-ff40c63fe5fa'),
      photo('photo-1582719478250-c89cae4dc85b'),
    ],
    rooms: [
      {
        id: 'garden',
        name: 'Garden double',
        sleeps: 2,
        price: 145,
        description: 'Queen bed, rainfall shower, and a private patio.',
      },
      {
        id: 'gorge',
        name: 'Gorge suite',
        sleeps: 3,
        price: 220,
        description: 'Separate lounge, plunge bath, and a gorge-facing balcony.',
      },
    ],
  },
  {
    id: 'hwange-bush',
    name: 'Hwange Bush Lodge',
    kind: 'lodge',
    area: 'Hwange National Park',
    city: 'Hwange',
    summary: 'Ten chalets on a waterhole, with guided drives included in the stay.',
    description:
      'Hwange Bush Lodge sits on the park edge. Evenings are spent on the deck while elephants come to drink. Each chalet has a canvas roof, an outdoor shower, and a fan for hot afternoons.',
    lat: -18.629,
    lng: 26.85,
    rating: 4.9,
    reviews: 94,
    amenities: ['Game drives', 'Breakfast', 'Dinner', 'Pool', 'Wifi'],
    images: [
      photo('photo-1516426122078-c23e76319801'),
      photo('photo-1547471080-7cc2caa01a7e'),
      photo('photo-1501785888041-af3ef285b470'),
    ],
    rooms: [
      {
        id: 'challet',
        name: 'Waterhole chalet',
        sleeps: 2,
        price: 310,
        description: 'King bed, outdoor shower, and a deck facing the pan.',
      },
      {
        id: 'family',
        name: 'Family chalet',
        sleeps: 4,
        price: 420,
        description: 'Two bedrooms and a shared verandah. Children welcome.',
      },
    ],
  },
  {
    id: 'kariba-shores',
    name: 'Kariba Shores Lodge',
    kind: 'lodge',
    area: 'Lake Kariba',
    city: 'Kariba',
    summary: 'Lakefront lodges with boat moorings and sunset cruises.',
    description:
      'Kariba Shores is built on stilts above the lake. Mornings start with coffee on the jetty. The lodge runs its own boats, so fishing and cruises are booked on site at the house rate.',
    lat: -16.516,
    lng: 28.8,
    rating: 4.6,
    reviews: 121,
    amenities: ['Boat', 'Breakfast', 'Wifi', 'Restaurant', 'Pool'],
    images: [
      photo('photo-1500375592092-40eb2168fd21'),
      photo('photo-1499793983690-e29da59ef1c2'),
      photo('photo-1520250497591-112f2f40a3f4'),
    ],
    rooms: [
      {
        id: 'jetty',
        name: 'Jetty room',
        sleeps: 2,
        price: 180,
        description: 'Lake view, mosquito nets, and a ceiling fan.',
      },
      {
        id: 'houseboat-cabin',
        name: 'Shore suite',
        sleeps: 3,
        price: 260,
        description: 'Lounge, day bed, and a private mooring.',
      },
    ],
  },
  {
    id: 'harare-capital',
    name: 'Harare Capital Hotel',
    kind: 'hotel',
    area: 'Harare CBD',
    city: 'Harare',
    summary: 'Business hotel with quiet rooms, a gym, and a reliable airport shuttle.',
    description:
      'Harare Capital is the group’s city base. Rooms are set back from the street. The business lounge, gym, and breakfast room stay open for in-house guests, and the direct rate includes parking.',
    lat: -17.8292,
    lng: 31.0522,
    rating: 4.4,
    reviews: 240,
    amenities: ['Wifi', 'Breakfast', 'Gym', 'Parking', 'Airport pickup'],
    images: [
      photo('photo-1542314831-068cd1dbfeeb'),
      photo('photo-1611892440504-42a792e24d32'),
      photo('photo-1590490360182-c33d57733427'),
    ],
    rooms: [
      {
        id: 'city',
        name: 'City king',
        sleeps: 2,
        price: 110,
        description: 'King bed, work desk, and blackout curtains.',
      },
      {
        id: 'executive',
        name: 'Executive twin',
        sleeps: 2,
        price: 135,
        description: 'Two twins or a zip-link king, plus lounge access.',
      },
    ],
  },
  {
    id: 'nyanga-highlands',
    name: 'Nyanga Highlands Lodge',
    kind: 'lodge',
    area: 'Eastern Highlands',
    city: 'Nyanga',
    summary: 'Stone cottages in pine forest, with fireplaces and trout streams nearby.',
    description:
      'Nyanga Highlands is the cool-weather lodge. Cottages have fireplaces and verandahs looking over the valleys. Walks, horse trails, and picnic lunches are arranged by the lodge team.',
    lat: -18.216,
    lng: 32.744,
    rating: 4.8,
    reviews: 77,
    amenities: ['Fireplace', 'Breakfast', 'Wifi', 'Hiking', 'Parking'],
    images: [
      photo('photo-1449158743715-0a90ebb6d2d8'),
      photo('photo-1470770841072-f978cf4d019e'),
      photo('photo-1500530855697-b586d89ba3ee'),
    ],
    rooms: [
      {
        id: 'cottage',
        name: 'Valley cottage',
        sleeps: 2,
        price: 160,
        description: 'Stone cottage, fireplace, and a queen bed.',
      },
      {
        id: 'loft',
        name: 'Family loft',
        sleeps: 5,
        price: 240,
        description: 'Main room plus a loft with three singles.',
      },
    ],
  },
  {
    id: 'bulawayo-heritage',
    name: 'Bulawayo Heritage Hotel',
    kind: 'hotel',
    area: 'Bulawayo',
    city: 'Bulawayo',
    summary: 'Restored colonial hotel with a courtyard restaurant and wide rooms.',
    description:
      'Bulawayo Heritage keeps the original verandahs and adds quiet, modern rooms behind them. It is the stopover hotel for guests heading to Matobo or Hwange, with packed breakfasts on request.',
    lat: -20.152,
    lng: 28.583,
    rating: 4.5,
    reviews: 133,
    amenities: ['Breakfast', 'Restaurant', 'Wifi', 'Parking', 'Pool'],
    images: [
      photo('photo-1455587734955-081b22074882'),
      photo('photo-1578683010236-d716f9a3f461'),
      photo('photo-1564501049412-61c2a3083791'),
    ],
    rooms: [
      {
        id: 'verandah',
        name: 'Verandah queen',
        sleeps: 2,
        price: 98,
        description: 'Courtyard verandah and a deep soaking tub.',
      },
      {
        id: 'suite',
        name: 'Heritage suite',
        sleeps: 3,
        price: 155,
        description: 'Sitting room, king bed, and a clawfoot bath.',
      },
    ],
  },
]

export function getProperty(id: string) {
  return properties.find((property) => property.id === id)
}

export function fromPrice(property: Property) {
  return Math.min(...property.rooms.map((room) => room.price))
}

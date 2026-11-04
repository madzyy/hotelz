import type { Property } from '../types'

const shot = (id: string, key: string) =>
  `https://q-xx.bstatic.com/xdata/images/hotel/max1280x900/${id}.jpg?k=${key}&o=`

export const properties: Property[] = [
  {
    id: 'kipling-court',
    name: 'Kipling Court',
    kind: 'apartment',
    area: 'Fairview, Lusaka',
    city: 'Lusaka',
    summary: 'A renovated two-bedroom apartment on Ituna Road, with a kitchen, balcony, and private parking.',
    description:
      'Kipling Court is apartment 3 on Ituna Road in Fairview. The whole apartment is yours: two bedrooms, two bathrooms, a hot tub, and a fully equipped kitchen. Lusaka National Museum is about a 12-minute walk away. Kenneth Kaunda International Airport is about 18 km from the door. Check-in is from 15:00 and check-out is by 10:00.',
    lat: -15.4183,
    lng: 28.2986,
    rating: 9.8,
    reviews: 8,
    amenities: [
      'Free parking',
      'Free Wifi',
      'Kitchen',
      'Hot tub',
      'Balcony',
      'Air conditioning',
      'Daily housekeeping',
      '24-hour security',
    ],
    images: [
      shot('841770929', 'c6b49e705950631a1404985b78ff54b425f7b0ffe1e3da1e17e3447e2e75452b'),
      shot('864263433', 'b479c74971e0886dc7ba3c5a4f4e0f3d42ce45f811f41e78777c4622cf873fb2'),
      shot('841771024', '3102239ccbc71f1e0166383f039089a5766a823fa5cb5c826f2a109805df0d7a'),
      shot('864264819', '31b5492b4a9b240f741fb4b01a2fcad0e7b1e641f48531bc119c1de9f6c96f62'),
      shot('857051551', '59d0c8064c0833ef52f0de9d3b4f3522dbbe72d6c50844ef8c82729da3f480ac'),
      shot('864263780', '150e5863319b6b3fad4363f7a9c0539d3743b838a571804e255a486a288b9bc5'),
      shot('857052860', '70fea2a5f64ced404d00dffaf30cc852b7d03610e2e64b800a2b7e2571dfe416'),
      shot('918953388', 'ab5ca5241b54fec16d698bd02a4833ceaea32506868372bc81d848fe33738cc7'),
    ],
    rooms: [
      {
        id: 'two-bed',
        name: 'Two-bedroom apartment',
        sleeps: 4,
        price: 95,
        description:
          'About 100 m². Queen bed plus two full beds, two bathrooms with a walk-in shower and a bath, kitchen, sofa, and balcony.',
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

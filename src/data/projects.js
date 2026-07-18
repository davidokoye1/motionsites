import courtyard from '../assets/project-courtyard.png'
import pavilion from '../assets/project-pavilion.png'
import chapel from '../assets/project-chapel.png'
import hillside from '../assets/project-hillside.png'
import detailCourtyard from '../assets/detail-courtyard.png'
import detailPavilion from '../assets/detail-pavilion.png'
import detailChapel from '../assets/detail-chapel.png'
import detailHillside from '../assets/detail-hillside.png'

export const PROJECTS = [
  {
    slug: 'courtyard-house',
    name: 'Courtyard House',
    place: 'Alentejo, Portugal',
    year: '2025',
    kind: 'Residential',
    wide: true,
    img: courtyard,
    alt: 'Warm concrete courtyard house interior opening onto an olive tree courtyard',
    detailImg: detailCourtyard,
    detailAlt: 'Built-in concrete bench beside a glass wall with olive tree shadows',
    area: '340 m²',
    status: 'Completed',
    materials: 'Concrete, glass, oak',
    intro:
      'A house that turns its back on the road and opens entirely inward — one room deep, wrapped around a single olive tree.',
    body: [
      'The clients asked for a house that would disappear from the street. The answer was a blank concrete wall to the north and a glazed courtyard to the south, so that every room faces the tree and none face a neighbour.',
      'The plan is a square ring, one room deep. Circulation happens along the glass, so moving through the house always means moving past the courtyard. There is no corridor anywhere in the building.',
      'The concrete was cast against rough-sawn boards from a demolished barn on the site. Its imprint is the only ornament the house has, and the afternoon sun does the rest.',
    ],
    credits: [
      { role: 'Structural engineer', name: 'AFA Consult' },
      { role: 'Landscape', name: 'Estudo Verde' },
      { role: 'Photography', name: 'Atelier Mono archive' },
    ],
  },
  {
    slug: 'chapel-of-a-single-light',
    name: 'Chapel of a Single Light',
    place: 'Naoshima, Japan',
    year: '2024',
    kind: 'Sacred',
    wide: false,
    img: chapel,
    alt: 'Tall concrete chapel interior lit by a narrow slot of daylight',
    detailImg: detailChapel,
    detailAlt: 'Narrow glowing slot of light in a monolithic concrete facade at dusk',
    area: '85 m²',
    status: 'Completed',
    materials: 'Concrete, glass',
    intro:
      'A chapel with one window — a nine-metre slot that admits a single blade of daylight and lets the sun conduct the service.',
    body: [
      'The commission asked for a non-denominational chapel on a hillside above the Seto Inland Sea. We proposed a building with almost nothing in it: four concrete walls, one bench, one opening.',
      'The slot is oriented to the winter solstice. At noon on the shortest day of the year, the light reaches the exact centre of the floor. Every other day it falls somewhere else, so the room is never the same twice.',
      'Acoustically the chapel is tuned by its taper — the walls lean inward by two degrees, which shortens the reverberation just enough for a single voice to remain intelligible.',
    ],
    credits: [
      { role: 'Structural engineer', name: 'Ohno & Partners' },
      { role: 'Acoustics', name: 'Nagata Field Office' },
      { role: 'Photography', name: 'Atelier Mono archive' },
    ],
  },
  {
    slug: 'stillwater-pavilion',
    name: 'Stillwater Pavilion',
    place: 'Marfa, Texas',
    year: '2024',
    kind: 'Cultural',
    wide: false,
    img: pavilion,
    alt: 'Low concrete art pavilion beside a still reflecting pool',
    detailImg: detailPavilion,
    detailAlt: 'Gallery interior with a sculpture lit by a strip of skylight',
    area: '620 m²',
    status: 'Completed',
    materials: 'Concrete, glass, limestone',
    intro:
      'A single-storey gallery for a private sculpture collection, doubled by the sheet of water it stands beside.',
    body: [
      'The desert around Marfa flattens everything, so the pavilion does not compete — it lies down. A 90-metre roof plane floats over a glass perimeter, and the only vertical gesture on the site is the building\'s reflection.',
      'Inside, the collection is lit exclusively from above. A continuous skylight slot runs the length of the gallery, baffled so that no direct sun ever touches a work — only the walls, which pass borrowed light onward.',
      'The pool is functional: it pre-cools the air drawn into the gallery\'s displacement ventilation, letting the building run without mechanical cooling for most of the year.',
    ],
    credits: [
      { role: 'Structural engineer', name: 'Guy Nordenson & Associates' },
      { role: 'Climate engineering', name: 'Transsolar' },
      { role: 'Photography', name: 'Atelier Mono archive' },
    ],
  },
  {
    slug: 'terraced-residence',
    name: 'Terraced Residence',
    place: 'Mallorca, Spain',
    year: '2023',
    kind: 'Residential',
    wide: true,
    img: hillside,
    alt: 'Concrete and glass residence stepping down a grassy hillside at golden hour',
    detailImg: detailHillside,
    detailAlt: 'Terrace with a shallow water channel under a cantilevered roof at golden hour',
    area: '410 m²',
    status: 'Completed',
    materials: 'Concrete, glass, stone',
    intro:
      'A house that never shows its full height — five levels folded into a hillside, each one reading as a single storey.',
    body: [
      'The site drops eleven metres from the road to the olive terrace below. Rather than fight the slope, the house adopts its logic: each level is a terrace, and each roof is the garden of the level above.',
      'From any point inside, the house appears to be one storey tall. The section does the work the elevation refuses to — bedrooms burrow into the hill for coolness, living spaces ride the top of the slope for the view.',
      'The retaining walls are the house. Structure, envelope, and landscape wall are a single pour, which is why the building appears less built than excavated.',
    ],
    credits: [
      { role: 'Structural engineer', name: 'BAC Engineering' },
      { role: 'Landscape', name: 'Taller Karin Daan' },
      { role: 'Photography', name: 'Atelier Mono archive' },
    ],
  },
]

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug)
}

export function adjacentProjects(slug) {
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  return {
    prev: PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(i + 1) % PROJECTS.length],
  }
}

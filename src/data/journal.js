import journalDrawing from '../assets/journal-drawing.webp'
import journalLight from '../assets/journal-light.webp'
import journalSite from '../assets/journal-site.webp'
import matConcrete from '../assets/mat-concrete.webp'
import matGlass from '../assets/mat-glass.webp'
import matStone from '../assets/mat-stone.webp'
import matTimber from '../assets/mat-timber.webp'
import detailCourtyard from '../assets/detail-courtyard.webp'
import detailChapel from '../assets/detail-chapel.webp'
import detailPavilion from '../assets/detail-pavilion.webp'
import detailHillside from '../assets/detail-hillside.webp'

export const ENTRIES = [
  {
    slug: 'why-we-still-draw-by-hand-first',
    title: 'Why we still draw by hand first',
    deck: 'The pencil is slower than the mouse, and that is the point.',
    date: 'June 2026',
    iso: '2026-06-12',
    year: '2026',
    theme: 'Drawing',
    readTime: '6 min read',
    minutes: 6,
    img: journalDrawing,
    alt: 'Hand-drawn floor plan on tracing paper under warm lamp light',
    blocks: [
      {
        type: 'p',
        text: 'Every project in this studio begins the same way: a roll of tracing paper, a soft pencil, and a rule that nobody is allowed to open a laptop. Clients sometimes find this quaint, as if we kept a horse in the car park. But the rule is not nostalgia. It is quality control.',
      },
      {
        type: 'note',
        label: 'Studio rule N° 3',
        text: 'No CAD before the third client meeting. The computer joins the project only after the section is settled by hand.',
      },
      {
        type: 'p',
        text: 'A drawing made by hand cannot be copied and pasted. Every wall you draw, you have chosen to draw, at that thickness, in that place. The software will happily mirror a bathroom or array a window without asking whether the light there deserves it. The pencil asks every time.',
      },
      {
        type: 'pull',
        text: 'Speed hides decisions. A hand drawing exposes every one of them.',
      },
      { type: 'break', label: 'II — What the hand knows' },
      {
        type: 'p',
        text: 'There is also the matter of error. On tracing paper, a mistake stays visible under the next sheet; the project carries its own history in graphite. We have often gone back four or five layers to recover an idea that was abandoned too early — the wall that was right the first time.',
      },
      {
        type: 'figure',
        img: detailCourtyard,
        alt: 'Built-in concrete bench beside a glass wall with olive tree shadows',
        caption: 'Courtyard House — the bench that survived from the first sketch to the finished building, unchanged.',
      },
      {
        type: 'p',
        text: 'When the drawings finally move to the computer, they move as decisions, not as searches. The model is a fair copy, in the old sense: the thinking has already happened. We think that is why our built work looks like our sketches — because the sketch was never a suggestion. It was the building, early.',
      },
    ],
  },
  {
    slug: 'a-year-of-measuring-light-in-one-room',
    title: 'A year of measuring light in one room',
    deck: 'We photographed the same wall at noon, every day, for a year.',
    date: 'March 2026',
    iso: '2026-03-04',
    year: '2026',
    theme: 'Light',
    readTime: '4 min read',
    minutes: 4,
    img: journalLight,
    alt: 'Sunlight falling through a narrow concrete aperture onto a bare wall',
    blocks: [
      {
        type: 'p',
        text: 'In the corner of the studio there is a room we do not use for anything. It has one aperture, four hundred millimetres wide, facing south-southeast. On the first working day of last year we set a camera on a tripod, pointed it at the west wall, and photographed it at noon. Then we did it again, every day, three hundred and eleven times.',
      },
      {
        type: 'note',
        label: 'The archive',
        text: '311 photographs, one missed week in August (nobody will admit to it), printed at postcard size and pinned in a grid.',
      },
      {
        type: 'p',
        text: 'The archive is the least efficient daylight study ever conducted. Software would have given us the same geometry in an afternoon. What the software would not have given us is the weather — the eleven days in November when the patch of sun never arrived at all, and the one afternoon in June when it landed on the floor junction and made the room feel twice its height.',
      },
      {
        type: 'pull',
        text: 'A daylight simulation tells you where the sun will be. It does not tell you whether you will care.',
      },
      { type: 'break', label: 'II — What we changed' },
      {
        type: 'figure',
        img: matGlass,
        alt: 'Detail of glass panel edge catching soft daylight',
        caption: 'Glass returns at the aperture — resized twice after the winter photographs.',
      },
      {
        type: 'p',
        text: 'Two live projects changed because of that wall. A chapel aperture grew narrower and taller; a kitchen lost a window it did not need. Patience turned out to be a design tool with a unit of measurement: one year, one wall, one photograph a day.',
      },
    ],
  },
  {
    slug: 'what-concrete-remembers',
    title: 'What concrete remembers',
    deck: 'Formwork is a mould for memory. Cast carefully, the building keeps a record of how it was made.',
    date: 'January 2026',
    iso: '2026-01-21',
    year: '2026',
    theme: 'Material',
    readTime: '5 min read',
    minutes: 5,
    img: matConcrete,
    alt: 'Close view of board-marked concrete with visible timber grain',
    blocks: [
      {
        type: 'p',
        text: 'Concrete has a reputation for being mute — the material of car parks and motorway bridges, poured by the tonne and forgotten. We think of it differently. Concrete is the only material on a building site that is liquid on Monday and permanent by Friday, and in between it will remember anything you press against it.',
      },
      {
        type: 'p',
        text: 'At the Courtyard House we cast the walls against rough-sawn boards from a barn that had stood on the site for ninety years. The barn is gone; its grain is not. Every knot and saw mark is printed at full scale into the walls that replaced it. Visitors run their hands along it before they know why.',
      },
      {
        type: 'note',
        label: 'Site note, day 40',
        text: 'The foreman rejected the first delivery of boards for being too clean. He was right.',
      },
      {
        type: 'pull',
        text: 'The imprint is the only ornament the house has. The afternoon sun does the rest.',
      },
      { type: 'break', label: 'II — Casting as archive' },
      {
        type: 'figure',
        img: detailChapel,
        alt: 'Concrete chapel interior with a single blade of light on the wall',
        caption: 'Chapel of a Single Light — the pour was scheduled around the weather, not the calendar.',
      },
      {
        type: 'p',
        text: 'This is why we write the formwork drawings ourselves rather than leaving them to the contractor. Board widths, tie positions, day joints — each one is a line the building will wear forever. A concrete wall is a photograph of its own construction, exposed once, developed over a century.',
      },
    ],
  },
  {
    slug: 'the-first-site-visit-is-the-whole-project',
    title: 'The first site visit is the whole project',
    deck: 'Everything a building will become is already present in the first hour on site.',
    date: 'November 2025',
    iso: '2025-11-18',
    year: '2025',
    theme: 'Site',
    readTime: '8 min read',
    minutes: 8,
    img: journalSite,
    alt: 'Small white concept model held against a blurred grassland site',
    blocks: [
      {
        type: 'p',
        text: 'There is a superstition in this studio that we defend as if it were a method: the first site visit decides the project. Not the survey, not the brief, not the planning meeting — the first hour of standing in the weather on the actual ground. Everything after that is transcription.',
      },
      {
        type: 'note',
        label: 'Field kit',
        text: 'A6 notebook, 2B pencil, compass, and a folding stool. Phones stay in the car for the first hour.',
      },
      {
        type: 'p',
        text: 'We arrive early and we arrive quiet. The rule of the first hour is that nobody proposes anything. You may notice — the wind arriving over the ridge, the neighbour’s roofline, where the grass is worn by walking, which way the sheep face — but you may not solve. Solving too early is how sites get buildings that could be anywhere.',
      },
      {
        type: 'pull',
        text: 'Nobody proposes anything for one hour. Noticing first, solving later.',
      },
      { type: 'break', label: 'II — The hillside' },
      {
        type: 'p',
        text: 'At the Hillside Longhouse the whole parti arrived in minute forty. The client had walked us to the "view side" of the plot, the one the estate agent photographed. But the worn path in the grass — the one the family actually used — ran along the contour, at an angle to the view, toward a gap in the stone wall. The house is that path, roofed.',
      },
      {
        type: 'figure',
        img: detailHillside,
        alt: 'Long low timber house following the slope of a hillside at dusk',
        caption: 'Hillside Longhouse — the plan follows the family’s desire line, not the postcard view.',
      },
      {
        type: 'p',
        text: 'When a scheme goes wrong later — and schemes always wobble around planning — we do not reach for references. We reach for the site notebook. The answer is nearly always on the first three pages, written down before we knew it was the answer.',
      },
      {
        type: 'p',
        text: 'The lesson took us ten years to learn and fits in one sentence: a building is a site’s opinion, held long enough to be made of stone.',
      },
    ],
  },
  {
    slug: 'in-praise-of-the-working-model',
    title: 'In praise of the working model',
    deck: 'Cardboard tells the truth faster than any render.',
    date: 'August 2025',
    iso: '2025-08-07',
    year: '2025',
    theme: 'Craft',
    readTime: '5 min read',
    minutes: 5,
    img: detailPavilion,
    alt: 'Timber pavilion interior with rhythmic exposed roof structure',
    blocks: [
      {
        type: 'p',
        text: 'Renders are for convincing. Models are for finding out. The difference matters, because a practice that only produces convincing images will eventually convince itself. Our models are grey card and glue, cut on the same table where we eat lunch, and they are never photographed for the website. They are instruments, not products.',
      },
      {
        type: 'note',
        label: 'Scale policy',
        text: '1:200 for the site, 1:50 for the rooms, 1:5 for the one junction the project will be remembered by.',
      },
      {
        type: 'p',
        text: 'A model at 1:50 has a way of being honest that a screen never manages. You cannot dolly a cardboard model to its best angle; it sits on the table in ordinary daylight, seen from above like no building ever is, and still it must feel right. If the roof rhythm works on grey card, it will work in timber.',
      },
      {
        type: 'pull',
        text: 'You cannot dolly a cardboard model to its best angle. That is its entire value.',
      },
      { type: 'break', label: 'II — The pavilion test' },
      {
        type: 'figure',
        img: matTimber,
        alt: 'Stacked timber battens showing end grain and surface texture',
        caption: 'Batten spacing for the pavilion roof — settled with a knife and 3mm card, not a parameter.',
      },
      {
        type: 'p',
        text: 'For the Meadow Pavilion we built eleven roof studies in a week. Ten of them died on the table, which is exactly where projects should die — cheaply, early, and in company. The eleventh is the one you can stand under today. It cost four euros in card and saved a structure we would have regretted for fifty years.',
      },
    ],
  },
  {
    slug: 'buildings-that-learn-to-age',
    title: 'Buildings that learn to age',
    deck: 'We design for the photograph taken in thirty years, not the one taken at handover.',
    date: 'May 2025',
    iso: '2025-05-14',
    year: '2025',
    theme: 'Material',
    readTime: '7 min read',
    minutes: 7,
    img: matStone,
    alt: 'Rough stone wall surface with varied weathered texture',
    blocks: [
      {
        type: 'p',
        text: 'Architecture has a dirty secret: most buildings look their best on the day they are handed over, and spend the next fifty years apologising. The sealant yellows, the render streaks, the crisp arris chips. We try to work the other way around — to choose materials that are merely good when new and become better as the weather gets at them.',
      },
      {
        type: 'p',
        text: 'Stone understands this contract best. The wall in the photograph above was unremarkable when it was laid; two decades of rain have given it a surface no specification could describe. Copper, oak, lime render, board-marked concrete — the whole palette of this studio is really one material: time, in different speeds.',
      },
      {
        type: 'note',
        label: 'Specification clause',
        text: 'We write expected weathering into the material schedule, wall by wall, so the client knows what the building is becoming.',
      },
      {
        type: 'pull',
        text: 'The palette of this studio is one material: time, at different speeds.',
      },
      { type: 'break', label: 'II — Detailing for rain' },
      {
        type: 'p',
        text: 'Ageing well is not luck; it is drainage. Every streak on a façade is a drawing of where the water went, so we draw the water first. Drips, throats, projections — the unglamorous millimetres that decide whether rain washes a wall evenly or writes graffiti on it. A parapet detail is a promise about the year 2055.',
      },
      {
        type: 'figure',
        img: detailCourtyard,
        alt: 'Built-in concrete bench beside a glass wall with olive tree shadows',
        caption: 'Courtyard House — the concrete was designed to darken unevenly under the olive tree, and has.',
      },
      {
        type: 'p',
        text: 'When clients ask for a maintenance-free building we tell them, gently, that there is no such thing — there are only buildings that wear their maintenance as decay or as character. The best compliment our work receives is not "it looks new". It is "it looks like it has always been there". That look is designed.',
      },
    ],
  },
]

export const THEMES = ['All', ...new Set(ENTRIES.map((e) => e.theme))]

export function getEntry(slug) {
  return ENTRIES.find((e) => e.slug === slug)
}

export function adjacentEntries(slug) {
  const i = ENTRIES.findIndex((e) => e.slug === slug)
  const prev = ENTRIES[(i - 1 + ENTRIES.length) % ENTRIES.length]
  const next = ENTRIES[(i + 1) % ENTRIES.length]
  return { prev, next }
}

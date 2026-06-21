# The Agora

A digital art gallery built to explore and celebrate the world of art, powered by the [Art Institute of Chicago's API](https://api.artic.edu/docs). The Agora gives users access to a vast collection of art-related data — artists, artworks, exhibitions, and rich metadata — through a clean, immersive browsing experience.

**Live site:** [the-agora.vercel.app](https://the-agora.vercel.app)

## Features

- **Featured artwork carousel** — handpicked, rotating selection of notable pieces on the homepage
- **Newly added** — a feed of recently surfaced works from the collection
- **Gallery** — browse the full collection of available artworks
- **Search** — find specific artists, works, or pieces by keyword
- **About** — project and collection context
- **High-resolution images & downloads** — view detailed artwork imagery and download pieces directly
- **Real-time data** — artwork details, descriptions, and metadata are fetched live from the Art Institute of Chicago API

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js |
| Language | TypeScript |
| UI Library | React |
| Styling | Tailwind CSS |
| Data Fetching | Axios |
| Server State / Caching | TanStack Query |
| File Downloads | file-saver |
| Icons | React Icons |
| UI Primitives | Radix UI |
| Carousel | Embla Carousel |
| Fonts | Fontsource (Montserrat) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/<your-username>/art-gallery.git
cd art-gallery
npm install
```

### Running Locally

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm run start
```

## Data Source

All artwork data, images, and metadata are sourced from the [Art Institute of Chicago API](https://api.artic.edu/docs), a free, public API providing access to one of the largest art collections in the world.

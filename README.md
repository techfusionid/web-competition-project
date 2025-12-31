# comp-web

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Biome** - Linting and formatting
- **Husky** - Git hooks for code quality
- **PWA** - Progressive Web App support
- **Turborepo** - Optimized monorepo build system

(tambahan)

- **arcjet** - For security
- **novu** - notification
- **openstatus** / betterstack
- **posthog** - analytics
- **featurebase / crisp** - customer support & feedback platform

## Getting Started

First, install the dependencies:

```bash
pnpm install
```
## Database Setup

This project uses PostgreSQL with Drizzle ORM.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/web/.env` file with your PostgreSQL connection details.

3. Apply the schema to your database:
```bash
pnpm run db:push
```


Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see your fullstack application.

## Project Structure

```
comp-web/
├── apps/
│   └── web/         # Fullstack application (Next.js)
├── packages/
│   ├── api/         # API layer / business logic
```

## Sitemaps

### landingpage

heroes sederhana yang menampilkan, +23 lomba per minggu

nampilin grid lomba lomba dalam ui yg mudah dibaca user, interaksinya mirip seperti instagram

### about-us

nyeritain siapa kami dan apa tujuan kami 

### categories

jenis lomba lomba berdasarkan kategori

### institute


### resources


### randomize

dapetin data random dari lomba-lomba yang sedang aktif

## Features

- toggle theme
- mobile responsive
- fast

## Available Scripts

- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications
- `pnpm run check-types`: Check TypeScript types across all apps
- `pnpm run db:push`: Push schema changes to database
- `pnpm run db:studio`: Open database studio UI
- `pnpm run check`: Run Biome formatting and linting
- `cd apps/web && pnpm run generate-pwa-assets`: Generate PWA assets
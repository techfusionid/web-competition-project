# Web Competition Project - AI Agent Context

## Tech Stack
- **Framework**: Next.js 15.5.9 (App Router)
- **Deployment**: Cloudflare Pages via `@opennextjs/cloudflare`
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS v4 + Radix UI + shadcn/ui
- **Analytics**: PostHog
- **Linting/Formatting**: Biome (not ESLint/Prettier)

## Commands
```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm format           # Format with Biome
pnpm check            # Check & format with Biome

# Database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema changes
pnpm db:studio        # Open Drizzle Studio

# Deployment
pnpm upload           # Build & upload to Cloudflare
pnpm preview          # Build & preview locally
pnpm deploy           # Build & deploy to Cloudflare
```

## Important Rules

### Biome Configuration
- **Files with comments**: `.jsonc` files are **ignored** (via `files.includes: ["**", "!*.jsonc"]`)
- **Indent style**: Tabs
- **Quote style**: Double quotes for JS/TS

### Deployment
- Uses **OpenNext.js** for Cloudflare deployment
- Wrangler config: `wrangler.jsonc` (ignored by Biome)
- Build output: `.open-next/`

### Component Conventions
- Use Radix UI primitives from `@radix-ui/react-*`
- UI components follow shadcn/ui patterns
- Class merging: `cn()` from `lib/utils.ts`
- Tailwind v4: CSS-first approach, `@import "tailwindcss"` in globals.css

### Database
- **Drizzle ORM** with PostgreSQL (`@types/pg`)
- Schema location: Check for `drizzle/` directory
- Migrations: Use `pnpm db:push` for quick schema updates during dev

## PWA
- Uses `next-pwa` for Progressive Web App features
- Service worker generated at build time

## When Adding Features
1. Check existing components in `src/components/` before creating new ones
2. Follow existing patterns (Radix + Tailwind)
3. Run `pnpm format` before committing
4. Test with `pnpm dev` locally first

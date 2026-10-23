# Kenya Red Cross Digital Transformation website

The public website is a Next.js 16 App Router application. Frappe v16 is the content database, public read API, and authenticated administration backend. Most public page data is fetched on the server from Frappe; interactive filters and forms are client components.

## Local development

Requirements: Node.js supported by Next.js 16 (20.9 or newer), npm, and a reachable Frappe v16 site with the `redcross_digital` app installed.

```bash
npm ci
```

Set the Frappe origin in `.env.local` (do not commit this file):

```dotenv
NEXT_PUBLIC_FRAPPE_API_URL=http://redcross.local:8000
# Optional server-only origin for authenticated admin requests. Use this when
# the Next.js server can reach Frappe on a private/internal address.
FRAPPE_URL=http://redcross.local:8000
```

Then start the website:

```bash
npm run dev
```

`NEXT_PUBLIC_FRAPPE_API_URL` must be an absolute origin with a scheme and host. Set it to the public or deployment-reachable Frappe origin in Vercel's environment settings. Production code does not fall back to `redcross.local` for the content client. `FRAPPE_URL` is server-only and can override the public origin for admin session traffic.

## Useful commands

```bash
npm run dev       # local development server
npm run lint      # ESLint over the repository
npx tsc --noEmit  # TypeScript check
npm run build     # optimized production build
npm run start     # serve the production build
```

## Documentation

- [Architecture, data flow, routes, admin, and deployment notes](docs/architecture.md)
- Backend API, DocTypes, publishing, submissions, and migration notes are documented in the Frappe app's `README.md` and `docs/operations.md`.

## Source of truth

Frappe is the source of truth for site configuration, people, projects, countries, thematic areas, partners, testimonials, blogs, innovations, knowledge resources, digital stories, and news items. Some design and presentation content remains local to the frontend, including navigation, impact figures, and about-page copy. Older files under `src/data/` and `src/data/storage/` also remain in the repository; they are legacy data and are not the write path for Frappe-managed website content.

The active admin CRUD and submissions inbox is `/admin/data`. It requires a Frappe account with the **System Manager** role. The former entity-specific admin screens are legacy interfaces; writes through the legacy `/api/data/*` route return `410 Gone`.

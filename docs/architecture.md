# Frontend architecture and operations

## Application structure

| Location | Responsibility |
| --- | --- |
| `src/app/` | App Router pages, layouts, loading/error boundaries, and Next.js Route Handlers. |
| `src/components/` | Shared page sections and interactive client components. Contact forms are grouped under `components/contact/`. |
| `src/lib/frappe/` | Frappe API transport, session handling, file URL resolution, and one adapter per content group. |
| `src/lib/get-data.ts` | Compatibility facade used by pages to access the Frappe adapters. About-page copy remains local. |
| `src/types/` | Frontend presentation types. Frappe field names are converted into these types in the adapters. |
| `src/data/` | Local design/presentation data and legacy datasets. Do not treat legacy content JSON/TypeScript as the current content database. |

### Public route/data map

| Page | Main Frappe data |
| --- | --- |
| `/` | People, projects, testimonials, countries, thematic areas, partners |
| `/blog` and `/blog/[slug]` | Blogs |
| `/people` and `/people/[slug]` | Person, with project relationships on profiles |
| `/portfolio` and `/portfolio/[slug]` | Projects, thematic areas, people, partners, countries |
| `/where-we-work` | Countries |
| `/innovation-research` | Innovations |
| `/knowledge-hub` | Knowledge Resource |
| `/stories/digital-stories` | Digital Story |
| `/stories/news-updates` | News Item |
| `/contact` | Site contact configuration and submission forms |

`src/lib/frappe/client.ts` calls the existing guest API methods `list_docs` and `get_doc`. Collection adapters in `src/lib/frappe/` map Frappe field names and values to UI types, parse JSON-backed values, format dates where needed, and resolve `/files/...` paths to the Frappe origin. Preserve this adapter layer when adding content fields; pages should not duplicate endpoint URLs or field mapping.

## Rendering, caching, and build behavior

Most public pages are async Server Components and fetch data on the server. The Frappe client opts into Next.js data revalidation every 300 seconds and assigns a `frappe:<DocType>` cache tag. Admin mutations revalidate that tag. Frappe also caches public API responses for 300 seconds and clears its API cache on document writes.

The dynamic detail routes `/blog/[slug]`, `/people/[slug]`, and `/portfolio/[slug]` set `dynamicParams = true` and return an empty array from `generateStaticParams()`. They resolve requested records on demand instead of enumerating every slug at build time. Other pages that fetch Frappe data may be prerendered by Next.js, so the configured Frappe origin may still need to be reachable during a production build. A local-only hostname such as `redcross.local` cannot resolve on Vercel. Configure the deployment backend URL in the build environment; if builds must succeed while Frappe is offline, deliberately revise rendering/caching and verify SEO behavior rather than hiding fetch failures.

Interactive client components handle filtering, visualizations, theme controls, and contact form state. Keep the data page server-rendered where possible; isolate browser-only behavior in client components.

## Admin session and CRUD

`/admin/login` submits Frappe credentials to `/api/auth/login`. The server verifies the Frappe user has the **System Manager** role, then stores Frappe `sid` and CSRF tokens in HTTP-only cookies. `src/lib/frappe/admin-session.ts` attaches those cookies to server-to-server Frappe calls and rechecks the user before proxying requests.

The current CRUD workspace is `/admin/data`:

- Content DocTypes are listed in `src/lib/frappe/admin-doctypes.ts`.
- `GET /api/admin/schema?doctype=...` returns editable field metadata from Frappe.
- `/api/admin/records/[doctype]` proxies list, read, create, update, and delete requests to Frappe's resource API. Submission DocTypes are read-only in this workspace.
- `POST /api/admin/upload` uploads public attachments to Frappe and returns the resulting `/files/...` URL.
- Lists are paginated in batches of 100. Publishing status filters are passed to Frappe. Content is ordered by `sort_order`, then creation time; submissions are ordered by last modification.

Frappe permissions remain authoritative for mutations. The Next.js role check is an additional access gate, not a replacement for Frappe's DocType permissions. Use Frappe Desk to grant or revoke System Manager access.

Older routes such as `/admin/blogs`, `/admin/people`, and `/admin/projects` use the legacy editor and `/api/data/[entity]`. That API now returns `410 Gone` for writes. Use `/admin/data` for live CRUD; avoid adding a second admin write path.

## Public submission flow

The contact UI sends JSON to the Next.js Route Handlers:

| Next.js route | Existing Frappe method | DocType |
| --- | --- | --- |
| `POST /api/feedback` | `redcross_digital.api.submit_feedback` | Feedback |
| `POST /api/inquiry` | `redcross_digital.api.submit_inquiry` | Inquiry |
| `POST /api/partner-inquiry` | `redcross_digital.api.submit_partnership_proposal` | Partnership Proposal |

`src/lib/security/request-body.ts` enforces JSON input and a 24 KiB body cap. Frappe validates each field again, rate-limits submissions, checks a hidden `website_url` honeypot, and inserts records without granting Guest access to the submission DocTypes. Keep server-side validation in place even when the form validates inputs in the browser.

## Images and files

Static assets are served from `public/`. Frappe-managed attachments use `/files/<filename>` and are resolved through `frappeFileUrl()`; `next.config.ts` configures allowed remote image origins and the development file rewrite. Set the production Frappe origin before build so the image allowlist and file rewrite point at the deployment backend. Do not replace `/files/...` paths with local paths unless the original file is intentionally a frontend asset.

## Accessibility and interaction conventions

- Use semantic headings, labels, buttons, and links; icon-only controls need accessible names.
- Preserve keyboard interaction and visible focus styles for filters, forms, dialogs, and navigation.
- Keep reduced-motion handling in components that animate.
- Provide loading, empty, and error states for Frappe-backed content.
- Treat rich text from Frappe as content, not executable markup; sanitize any HTML rendering.

## Verification checklist

```bash
npx eslint src/app src/components src/lib
npx tsc --noEmit
npm run build
```

The build check requires the configured Frappe origin to be reachable when the static parameter generators run. For admin changes, also sign in with a System Manager account and verify list, create, edit, delete, attachments, status filtering, ordering, and the read-only inbox against a non-production site.

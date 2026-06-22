# Repository Map - OptiLens Compare

This map registers the workspaces managed under the OptiLens Compare monorepo.

| Workspace / Folder | Purpose | Tech Stack | Repository URL | Owner Team | Relevant Standards |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **apps/backend** | REST API service, catalog matching engine, scraper | Node.js, Express, TypeScript | `https://github.com/aitordiaz/optilens-compare` | Team Backend | standards/development-standards.md |
| **apps/frontend** | User-facing lens comparison web app | React, Vite, CSS, TypeScript | `https://github.com/aitordiaz/optilens-compare` | Team Frontend | standards/development-standards.md |
| **packages/db** | Prisma models and PostgreSQL schema definitions | PostgreSQL, Prisma ORM | `https://github.com/aitordiaz/optilens-compare` | Team Backend | standards/architecture-standards.md |
| **packages/common** | Shared lens data models and type definitions | TypeScript | `https://github.com/aitordiaz/optilens-compare` | Team Shared | standards/development-standards.md |

## Operational Commands Map
- **Monorepo Root**:
  - Install Dependencies: `npm install`
  - Build All Workspaces: `npm run build`
  - Start Dev Mode (All): `npm run dev`
- **apps/backend**:
  - Test: `npm run test --workspace=backend`
- **apps/frontend**:
  - Test: `npm run test --workspace=frontend`
- **packages/db**:
  - Generate Client: `npx prisma generate --schema=packages/db/prisma/schema.prisma`
  - Database Migration: `npx prisma migrate dev --schema=packages/db/prisma/schema.prisma`

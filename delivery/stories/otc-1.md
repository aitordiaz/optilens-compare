# Story: OTC-1 - Establish TS Monorepo Skeleton

## Metadata
- **Status**: Closed
- **Epic**: [N/A]
- **Target Repositories**: monorepo
- **Target Product**: optilens-compare
- **Architect Sign-off**: Antigravity / 2026-06-22

## 1. Description
```text
As a software developer
I want a standard TypeScript monorepo skeleton for OptiLens Compare
So that the development team has a unified structure, shared packages, database models, and build/run scripts ready.
```

## 2. Acceptance Criteria
### Scenario 1: Monorepo Workspaces Configuration
- **Given** the monorepo root directory
- **When** checking the workspaces configuration in package.json
- **Then** the packages `apps/backend`, `apps/frontend`, `packages/db`, and `packages/common` must be registered as npm workspaces.

### Scenario 2: Packages and Apps Setup
- **Given** the project structure
- **When** checking subdirectories
- **Then** the folders `apps/backend/src`, `apps/frontend/src`, `packages/db/prisma`, and `packages/common/src` must exist.
- **And** they must contain basic TypeScript configs (`tsconfig.json`) and entry points.

### Scenario 3: Database Package with Prisma
- **Given** the `packages/db` package
- **When** running the Prisma client generation command `npx prisma generate --schema=packages/db/prisma/schema.prisma`
- **Then** the Prisma client is successfully generated with basic schemas (e.g. Lens, Retailer, PriceHistory).

### Scenario 4: Shared Types Package
- **Given** the `packages/common` package
- **When** compiling TypeScript in common
- **Then** typescript output is generated with lens-related data interfaces.

### Scenario 5: Integrated Dev Run Script
- **Given** all workspace dependencies are installed
- **When** running the dev script `npm run dev` at the monorepo root
- **Then** frontend and backend start concurrently without failure.

## 3. Technical Notes
* **Project Tooling**: npm workspaces will manage dependencies and links between local packages.
* **TypeScript Settings**:
  - Root `tsconfig.json` provides shared TS compiler options.
  - Sub-packages inherit or customize compiler choices.
* **Prisma schema definition**:
  - Located in `packages/db/prisma/schema.prisma`.
  - Providers: postgresql (using env var `DATABASE_URL`).
  - Core models: `Lens` (id, name, type, power, baseCurve, diameter, brand, description), `Retailer` (id, name, url), `PriceHistory` (id, price, lensId, retailerId, timestamp).
* **Shared Types (`packages/common`)**:
  - Export standard Lens payload interfaces so backend and frontend have compile-time contract safety.
* **API Backend Service (`apps/backend`)**:
  - Uses Express, ts-node-dev for hot-reloads, and Prisma client to connect to Postgres.
* **Web Frontend Client (`apps/frontend`)**:
  - Built with Vite, React, TypeScript. Custom CSS rules.
* **Exclusions**:
  - Actual scraping engines, database seeding, or advanced UI design are out of scope for this skeleton task.

## 4. Delivery Assets
- **Development Plan**: [development-plan-otc-1.md](file:///home/aitor/projects/optilens-compare/delivery/stories/development-plan-otc-1.md)
- **QA Report**: [qa-report-otc-1.md](file:///home/aitor/projects/optilens-compare/delivery/stories/qa-report-otc-1.md)
- **Merge Request URL**: Local Workspace Merge (Branch `feature/story-otc-1`)

# Story: OTC-1 - Establish TS Monorepo Skeleton

## Metadata
- **Status**: Draft
- **Epic**: [N/A]
- **Target Repositories**: monorepo
- **Target Product**: optilens-compare
- **Architect Sign-off**: [Pending]

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

### Scenario 3: Packages and Apps Setup
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
* The backend should be a basic Express app with TypeScript.
* The frontend should be a Vite React app with TypeScript and vanilla CSS.
* The db package should use Prisma schema with a PostgreSQL provider.
* The common package should exports TS types/interfaces used by both frontend and backend.
* Use `concurrently` at the root package.json to start both apps with `npm run dev`.

## 4. Delivery Assets
- **Development Plan**: [Pending]
- **QA Report**: [Pending]
- **Merge Request URL**: [Pending]

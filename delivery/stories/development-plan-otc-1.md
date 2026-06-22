# Development Plan: OTC-1 - Establish TS Monorepo Skeleton

- **Associated Story**: [OTC-1](file:///home/aitor/projects/optilens-compare/delivery/stories/otc-1.md)
- **Target Product**: optilens-compare
- **Architect**: Antigravity

## 1. Impacted Repositories
- **monorepo root**: Configuration of package.json workspaces, typescript configs, eslint/prettier, gitignore, and concurrent dev execution.
- **packages/common**: Setup shared lens data TypeScript interfaces and interfaces for scraper payloads.
- **packages/db**: Setup Prisma schema definition, Postgres provider config, and prisma generation.
- **apps/backend**: Express app skeleton with router, simple endpoint for checking backend health and schema data.
- **apps/frontend**: Vite React app skeleton with custom CSS, basic comparative dashboard layout pointing to backend.

## 2. Technology Stack & Operational Context
- **Monorepo / Workspaces Manager**: npm workspaces (v8+ / Node 18+)
- **Languages**: TypeScript, JavaScript
- **Backend Language/Framework**: Node.js Express with TypeScript (`ts-node-dev`)
- **Frontend Language/Framework**: React with Vite and TypeScript, Vanilla CSS
- **Database Engine / ORM**: PostgreSQL database interface using Prisma ORM

## 3. Sequence of Modifications

### Phase 1: Monorepo Root Configurations
- Files to create/update:
  - `package.json`: Configure npm workspaces (`apps/*`, `packages/*`), root dependencies (`typescript`, `concurrently`), and dev/build scripts.
  - `tsconfig.json`: Root TypeScript config setting common compiler options.
  - `.gitignore`: Standard monorepo exclusions (node_modules, dist, .env, generated prisma client).
- Verification: Running `npm install` installs dependencies globally and configures links.

### Phase 2: Packages Creation (Shared & DB)
- **packages/common**:
  - Files to create: `packages/common/package.json`, `packages/common/tsconfig.json`, `packages/common/src/index.ts` (exporting core interfaces: `Lens`, `Retailer`, `PriceHistory`).
- **packages/db**:
  - Files to create: `packages/db/package.json`, `packages/db/tsconfig.json`, `packages/db/prisma/schema.prisma` (declaring database schema).
- Verification: Running `npx prisma generate --schema=packages/db/prisma/schema.prisma` completes without error.

### Phase 3: Express Backend App Setup (`apps/backend`)
- Files to create:
  - `apps/backend/package.json`: Target dependency on `@optilens/db` and `@optilens/common`.
  - `apps/backend/tsconfig.json`: Custom backend tsconfig.
  - `apps/backend/src/index.ts`: Basic server routing on port 3001, returning health check and static lens search data.
- Verification: Starting server manually using ts-node or dev script.

### Phase 4: Vite React Frontend App Setup (`apps/frontend`)
- Files to create:
  - `apps/frontend/package.json`: React/Vite configuration.
  - `apps/frontend/tsconfig.json`: Vite-compatible tsconfig.
  - `apps/frontend/vite.config.ts`: Vite dev server configurations.
  - `apps/frontend/index.html`: Base HTML layout.
  - `apps/frontend/src/main.tsx`, `apps/frontend/src/App.tsx`, `apps/frontend/src/index.css`: Frontend app skeleton.
- Verification: Frontend renders basic comparative user interface.

### Phase 5: Root Scripts Configuration & Verification
- Files to update:
  - Root `package.json`: Add script `npm run dev` running backend and frontend concurrently.
- Verification: Run `npm run dev` and confirm both apps launch successfully.

## 4. Testing Strategy
- **Root Build Command**: `npm run build`
- **Workspaces Dev Command**: `npm run dev`
- **Acceptance Verification**:
  1. Access `http://localhost:3001/api/health` and verify Express JSON response.
  2. Access `http://localhost:3000` (or the Vite dev port) and verify Vite React dashboard loads in browser context.

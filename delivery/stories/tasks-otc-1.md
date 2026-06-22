# Task Tracker: OTC-1 - Establish TS Monorepo Skeleton

- **Story**: [OTC-1](file:///home/aitor/projects/optilens-compare/delivery/stories/otc-1.md)
- **Developer Branch**: `feature/story-otc-1`

## Task Checklist
- [x] Create isolated git worktree for feature implementation.
- [x] Configure root `package.json`, `tsconfig.json`, and `.gitignore`.
- [x] Create `packages/common` workspace containing core TS interfaces.
- [x] Create `packages/db` workspace containing Prisma schema with `Lens`, `Retailer`, `PriceHistory`.
- [x] Create `apps/backend` workspace with Express app skeleton using common types and Prisma schema.
- [x] Create `apps/frontend` workspace with Vite React app skeleton.
- [x] Install all monorepo dependencies and verify Prisma generation.
- [x] Run typescript builds to verify there are no compilation errors.
- [x] Run the monorepo dev script and verify both apps run concurrently.

## Verification Evidence
```text
$ npm run build
> optilens-compare-root@1.0.0 build
> npm run build -w @optilens/common && npm run build -w @optilens/db && npm run build -w @optilens/backend && npm run build -w @optilens/frontend

> @optilens/common@1.0.0 build
> tsc

> @optilens/db@1.0.0 build
> tsc

> @optilens/backend@1.0.0 build
> tsc

> @optilens/frontend@1.0.0 build
> tsc && vite build

vite v5.4.21 building for production...
transforming (31) ✓ 31 modules transformed.
rendering chunks (1)...
dist/index.html                   0.43 kB │ gzip:  0.29 kB
dist/assets/index-BKWfEG01.css    6.35 kB │ gzip:  2.08 kB
dist/assets/index-C04uRBlN.js   147.17 kB │ gzip: 47.28 kB
✓ built in 462ms

$ npm run dev (in background)
[0] [Server]: Backend running on http://localhost:3001
[1]   VITE v5.4.21  ready in 125 ms
[1]   ➜  Local:   http://localhost:3000/

$ curl -s http://localhost:3001/api/health
{"status":"healthy","timestamp":"2026-06-22T18:55:31.995Z","services":{"backend":"active","database":"offline (unable to connect)"}}

$ curl -sI http://localhost:3000 | head -n 1
HTTP/1.1 200 OK
```

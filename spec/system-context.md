# System Context - OptiLens Compare

OptiLens Compare is implemented as a unified TypeScript monorepo containing the web client, REST API, and data storage.

```
┌────────────────────────────────────────────────────────┐
│                   monorepo workspace                   │
│                                                        │
│  ┌──────────────────┐           ┌───────────────────┐  │
│  │  apps/frontend   │ ────────> │   apps/backend    │  │
│  │  (React / Vite)  │           │ (Express/Node.js) │  │
│  └──────────────────┘           └─────────┬─────────┘  │
│                                           │            │
│                                           ▼            │
│                                 ┌───────────────────┐  │
│                                 │    packages/db    │  │
│                                 │ (PostgreSQL/Prisma)  │
│                                 └───────────────────┘  │
└────────────────────────────────────────────────────────┘
```

## System Interfaces
- **Web App Client**: Mobile-first SPA built in React that communicates with the backend REST API to search and view comparisons.
- **REST API Endpoint**: Service running on Node.js/Express handling search auto-completions, equivalency resolving, and analytics.
- **Data Scraper / Crawler**: Background process (running under apps/backend) that scrapes or receives API feeds of lens prices and availability from retailer websites.

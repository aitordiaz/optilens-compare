# OptiLens Compare

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

OptiLens Compare is a mobile-first, single-page web client and matching API service designed to compare contact lens prices and specifications from online retailers. It features automatic equivalency resolving, catalog crawling matching, and structured analytics.

This repository is organized as a **TypeScript Monorepo** using **npm workspaces**.

---

## 📁 Repository Structure

```text
optilens-compare/
├── apps/
│   ├── frontend/         # React SPA web application (Vite, TS, custom CSS)
│   └── backend/          # Express API server (catalog match engine, crawler mock)
├── packages/
│   ├── db/               # Relational database models (Prisma, PostgreSQL schema)
│   └── common/           # Shared lens data models and type definitions
├── delivery/             # Cerebrum.md Agent Brain Harness stories & plans (ignored)
├── spec/                 # Product specs & system context requirements
├── package.json          # Root workspace scripts and dependencies
└── tsconfig.json         # Base TypeScript configuration
```

---

## 🛠️ Prerequisites

To run this project locally, ensure you have the following installed:
* **Node.js** (v18.x or higher)
* **npm** (v8.x or higher)
* **PostgreSQL** database (optional for local mock mode; required for migrations)

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Install Dependencies
Run the install command at the monorepo root to configure dependencies across all workspaces:
```bash
npm install
```

### 2. Generate Prisma Client
Build the type definitions for the Prisma client from the schema definition:
```bash
npx prisma generate --schema=packages/db/prisma/schema.prisma
```

### 3. Database Migrations (Optional)
If running a local PostgreSQL instance, specify your connection string in a `.env` file at the root:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/optilens"
```
Then, execute database schema migrations:
```bash
npx prisma migrate dev --schema=packages/db/prisma/schema.prisma
```

### 4. Run Development Servers
Start both the API backend and the React frontend concurrently:
```bash
npm run dev
```
Once started:
* **Frontend Web Client**: [http://localhost:3000](http://localhost:3000)
* **REST API Backend**: [http://localhost:3001](http://localhost:3001)

### 5. Build for Production
To build and compile all packages for production deployment, run:
```bash
npm run build
```

---

## ⚙️ Workspaces Technical Context

### 1. `@optilens/common`
* **Purpose**: Core data definitions.
* **Exports**: Types for `Lens`, `Retailer`, `PriceHistory`, and `LensComparison`.

### 2. `@optilens/db`
* **Purpose**: Relational schema access.
* **ORM**: Prisma client configured for PostgreSQL.
* **Schema Location**: `packages/db/prisma/schema.prisma`

### 3. `@optilens/backend`
* **Purpose**: Express web API.
* **Endpoints**:
  * `GET /api/health` - Internal system status.
  * `GET /api/lenses` - List matched lenses and retailers price data (falls back to mock data gracefully when the DB is offline).

### 4. `@optilens/frontend`
* **Purpose**: User dashboard.
* **Theme**: Glassmorphism premium dark mode with search, brand filtering, and automatic highlight of best retailer offers.
* **Build Tool**: Vite with proxy rules to reroute `/api` to port `3001`.

---

## 🧠 Brain Harness Management
This project's lifecycle is structured by the [cerebrum.md AI Agent Brain Harness](/home/aitor/projects/cerebrum.md/README.md). Requirements traceability, refinement, development planning, implementation worktrees, and QA validations follow strict markdown contract gates under the `delivery/` directory.

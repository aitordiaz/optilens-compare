# Architectural Decisions Log - OptiLens Compare

- **[ADR-001] Monorepo Code Layout**:
  - **Status**: Approved
  - **Rationale**: Co-locating the backend (Node.js/Express) and frontend (React/Vite) allows sharing TypeScript interface definitions directly. It reduces the setup friction and overhead of multiple repositories for the MVP.
- **[ADR-002] PostgreSQL + Prisma ORM**:
  - **Status**: Approved
  - **Rationale**: Relational data modeling is perfect for mapping Manufacturers, Base Models, Retailers, and Private Labels. Prisma handles database migrations type-safely.

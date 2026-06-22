# Architecture Principles - OptiLens Compare

- **Monorepo Design**: House the backend API and frontend application inside a single codebase to maximize development velocity, share TypeScript types directly, and simplify building and testing the MVP.
- **Immutable Lens Core**: Keep manufacturer specs (Base Curve, Material, Diameter) in strict, validated lookup tables so they cannot be modified casually, preventing incorrect equivalent matches.
- **API-First Strategy**: The frontend must consume a clean, stateless REST API, allowing future native mobile apps or browser extensions to use the same matching engine easily.
- **Web Scraping Decoupling**: Isolate any price scraping or retail API sync jobs from the core web server to avoid blocking requests or running out of memory.

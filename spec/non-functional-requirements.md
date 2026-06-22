# Non-Functional Requirements - OptiLens Compare

## 1. Performance & UX responsiveness
- **NFR-PERF-01**: Search autocomplete and query resolution API endpoints must return results within 150ms under typical loads.
- **NFR-PERF-02**: The web frontend must be optimized for mobile devices (Responsive Web Design), achieving a mobile Lighthouse Performance score of 90+.

## 2. Data Integrity & Matching Accuracy
- **NFR-DATA-01**: The system must enforce data constraints preventing a mapping of lenses with mismatched physical characteristics (Base Curve, Diameter, Material) to avoid dispensing incompatible product advice.
- **NFR-DATA-02**: Retailer prices must include an audit trail containing the "last crawled" or "last modified" timestamp.

## 3. SEO & Discoverability
- **NFR-SEO-01**: The platform must support dynamic page titles, descriptions, and schemas for search engine indexation of high-intent queries (e.g., "equivalent to [Retailer Brand Name] lenses").

# Functional Requirements - OptiLens Compare

## 1. Catalog & Mapping Registry
- **FR-CAT-01**: Store and manage manufacturer profiles (e.g., CooperVision, Alcon, Bausch + Lomb) and their base product models (e.g., Biofinity, Dailies Total 1).
- **FR-CAT-02**: Store retailer-specific white-label names, package sizes, and product URLs, linking them back to the manufacturer's base model.
- **FR-CAT-03**: Maintain key technical lens attributes required to confirm equivalence: Base Curve (BC), Diameter (DIA), Water Content, Oxygen Permeability (Dk/t), and Material (e.g., Comfilcon A).

## 2. Equivalency Matching & Search
- **FR-SRCH-01**: Allow users to query by typing any manufacturer model name or retailer white-label name.
- **FR-SRCH-02**: Resolve the queried lens to its manufacturer base model and display all matching equivalents from other retailers.
- **FR-SRCH-03**: Highlight matching technical specifications to reassure the user that the lenses are physically identical despite different names.

## 3. Comparison & Price Normalization
- **FR-COMP-01**: Display a list of retailers selling the equivalent lenses, side-by-side with their pricing, packaging size options, and direct links.
- **FR-COMP-02**: Calculate and display normalized price-per-lens metrics (e.g., comparing a 6-pack to a 3-pack or 90-pack).

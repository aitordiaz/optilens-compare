import { useEffect, useState } from 'react';
import { LensComparison } from '@optilens/common';

export default function App() {
  const [comparisons, setComparisons] = useState<LensComparison[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    fetch('/api/lenses')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch lens data');
        }
        return res.json();
      })
      .then((data: LensComparison[]) => {
        setComparisons(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not connect to comparison backend server.');
        setLoading(false);
      });
  }, []);

  const filteredComparisons = comparisons.filter((item) => {
    const matchesSearch = item.lens.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.lens.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.lens.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="app-container">
      {/* Background decoration */}
      <div className="glow-orb main-orb"></div>
      <div className="glow-orb sub-orb"></div>

      <header className="app-header">
        <div className="logo-section">
          <span className="logo-icon">👁️</span>
          <h1>OptiLens <span className="gradient-text">Compare</span></h1>
        </div>
        <p className="subtitle">Real-time contact lens catalog matcher and price comparison service</p>
      </header>

      <main className="dashboard-content">
        <section className="search-filter-section glass-panel">
          <div className="input-group">
            <label htmlFor="search-input">Search Lenses</label>
            <input
              id="search-input"
              type="text"
              placeholder="e.g. Acuvue, CooperVision, Oasys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="type-select">Filter by Type</label>
            <select
              id="type-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Lenses</option>
              <option value="daily">Daily Lenses</option>
              <option value="weekly">Weekly Lenses</option>
              <option value="biweekly">Biweekly Lenses</option>
              <option value="monthly">Monthly Lenses</option>
            </select>
          </div>
        </section>

        {loading ? (
          <div className="loading-state glass-panel">
            <div className="spinner"></div>
            <p>Scanning retailer catalogs & matching prices...</p>
          </div>
        ) : error && comparisons.length === 0 ? (
          <div className="error-state glass-panel">
            <span className="error-icon">⚠️</span>
            <h3>Backend Offline</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={() => window.location.reload()}>Retry Connection</button>
          </div>
        ) : (
          <div className="comparisons-grid">
            {filteredComparisons.map((item) => {
              // Sort retailer prices from lowest to highest
              const sortedPrices = [...item.retailerPrices].sort((a, b) => a.price - b.price);
              const bestPrice = sortedPrices[0]?.price;

              return (
                <div key={item.lens.id} className="lens-card glass-panel">
                  <div className="card-header">
                    <span className="brand-tag">{item.lens.brand}</span>
                    <span className={`type-tag type-${item.lens.type}`}>{item.lens.type}</span>
                  </div>

                  <h2 className="lens-title">{item.lens.name}</h2>
                  <p className="lens-description">{item.lens.description}</p>

                  <div className="specs-list">
                    <div className="spec-item">
                      <span className="spec-label">BC (Base Curve)</span>
                      <span className="spec-value">{item.lens.baseCurve} mm</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">DIA (Diameter)</span>
                      <span className="spec-value">{item.lens.diameter} mm</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Power (PWR)</span>
                      <span className="spec-value">{item.lens.power}</span>
                    </div>
                  </div>

                  <h3 className="retailer-header">Available Offers</h3>
                  <div className="offers-list">
                    {sortedPrices.map((offer) => {
                      const isBest = offer.price === bestPrice;
                      return (
                        <div key={offer.retailer.id} className={`offer-item ${isBest ? 'best-offer' : ''}`}>
                          <div className="offer-retailer">
                            <span className="retailer-name">{offer.retailer.name}</span>
                            {isBest && <span className="best-deal-pill">Best Deal</span>}
                          </div>
                          <div className="offer-price-details">
                            <span className="offer-price">${offer.price.toFixed(2)}</span>
                            <a
                              href={offer.retailer.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="offer-link"
                            >
                              Buy ↗
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {filteredComparisons.length === 0 && (
              <div className="empty-state glass-panel col-span-all">
                <p>No contact lenses matched your search filter.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="app-footer-bar">
        <p>© 2026 OptiLens Compare. Managed via Cerebrum.md Agent Brain Harness.</p>
      </footer>
    </div>
  );
}

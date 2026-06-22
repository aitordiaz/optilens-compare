export interface Lens {
  id: string;
  name: string;
  brand: string;
  type: 'daily' | 'weekly' | 'monthly' | 'biweekly';
  power: number;
  baseCurve: number;
  diameter: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Retailer {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceHistory {
  id: string;
  price: number;
  lensId: string;
  retailerId: string;
  timestamp: Date;
}

export interface LensComparison {
  lens: Lens;
  retailerPrices: {
    retailer: Retailer;
    price: number;
    timestamp: Date;
  }[];
}

export interface SearchLensRequest {
  query?: string;
  power?: number;
  type?: string;
}

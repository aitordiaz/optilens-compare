import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { LensComparison } from '@optilens/common';
import { prisma } from '@optilens/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', async (req: Request, res: Response) => {
  let dbStatus = 'disconnected';
  try {
    // Quick probe to verify if DB is connected
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'connected';
  } catch (error) {
    // Graceful handling if DB is not running yet during skeleton testing
    dbStatus = 'offline (unable to connect)';
  }

  res.json({
    status: 'healthy',
    timestamp: new Date(),
    services: {
      backend: 'active',
      database: dbStatus
    }
  });
});

// Mock database comparisons data when Postgres is offline
const mockComparisons: LensComparison[] = [
  {
    lens: {
      id: 'lens-1',
      name: 'Acuvue Oasys 1-Day',
      brand: 'Acuvue',
      type: 'daily',
      power: -2.5,
      baseCurve: 8.5,
      diameter: 14.3,
      description: 'HydrLuxe technology daily contacts for exceptional comfort.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    retailerPrices: [
      {
        retailer: { id: 'ret-1', name: 'Lens.com', url: 'https://lens.com', createdAt: new Date(), updatedAt: new Date() },
        price: 33.99,
        timestamp: new Date()
      },
      {
        retailer: { id: 'ret-2', name: '1-800 Contacts', url: 'https://1800contacts.com', createdAt: new Date(), updatedAt: new Date() },
        price: 38.50,
        timestamp: new Date()
      },
      {
        retailer: { id: 'ret-3', name: 'Discount Contact Lenses', url: 'https://discountcontactlenses.com', createdAt: new Date(), updatedAt: new Date() },
        price: 35.95,
        timestamp: new Date()
      }
    ]
  },
  {
    lens: {
      id: 'lens-2',
      name: 'Biofinity',
      brand: 'CooperVision',
      type: 'monthly',
      power: -3.0,
      baseCurve: 8.6,
      diameter: 14.0,
      description: 'Aquaform technology monthly lenses for natural wetness.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    retailerPrices: [
      {
        retailer: { id: 'ret-1', name: 'Lens.com', url: 'https://lens.com', createdAt: new Date(), updatedAt: new Date() },
        price: 24.99,
        timestamp: new Date()
      },
      {
        retailer: { id: 'ret-2', name: '1-800 Contacts', url: 'https://1800contacts.com', createdAt: new Date(), updatedAt: new Date() },
        price: 29.99,
        timestamp: new Date()
      }
    ]
  }
];

// Main API comparison endpoint
app.get('/api/lenses', async (req: Request, res: Response) => {
  try {
    // Try to query real lenses if postgres is populated
    const count = await prisma.lens.count();
    if (count > 0) {
      const lenses = await prisma.lens.findMany({
        include: {
          prices: {
            include: {
              retailer: true
            }
          }
        }
      });
      
      const comparisons: LensComparison[] = lenses.map(l => ({
        lens: {
          id: l.id,
          name: l.name,
          brand: l.brand,
          type: l.type as any,
          power: l.power,
          baseCurve: l.baseCurve,
          diameter: l.diameter,
          description: l.description,
          createdAt: l.createdAt,
          updatedAt: l.updatedAt
        },
        retailerPrices: l.prices.map(p => ({
          retailer: {
            id: p.retailer.id,
            name: p.retailer.name,
            url: p.retailer.url,
            createdAt: p.retailer.createdAt,
            updatedAt: p.retailer.updatedAt
          },
          price: p.price,
          timestamp: p.timestamp
        }))
      }));
      
      return res.json(comparisons);
    }
  } catch (error) {
    // Database check failed or empty; fall through to mock data
  }
  
  res.json(mockComparisons);
});

app.listen(PORT, () => {
  console.log(`[Server]: Backend running on http://localhost:${PORT}`);
});

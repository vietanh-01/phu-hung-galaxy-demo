import prisma from '@/lib/db';
import { Product, Partner, ContactSubmission } from '@prisma/client';

// This interface should be consistent with the one in RecentActivityWidget.tsx
export interface ActivityItem {
  id: string;
  type: 'product' | 'category' | 'partner' | 'contact';
  action: 'created' | 'updated' | 'deleted' | 'received';
  title: string;
  description?: string;
  timestamp: Date;
}

const isNew = (createdAt: Date, updatedAt: Date): boolean => {
  // If updated within 5 seconds of creation, consider it 'created'
  return updatedAt.getTime() - createdAt.getTime() < 5000;
};

export async function getRecentActivities(limit: number = 5): Promise<ActivityItem[]> {
  const [recentProducts, recentPartners, recentContacts] = await Promise.all([
    prisma.product.findMany({
      take: limit,
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.partner.findMany({
      take: limit,
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.contactSubmission.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const productActivities: ActivityItem[] = recentProducts.map((p: Product) => ({
    id: `product-${p.id}`,
    type: 'product',
    action: isNew(p.createdAt, p.updatedAt) ? 'created' : 'updated',
    title: p.name,
    timestamp: p.updatedAt,
  }));

  const partnerActivities: ActivityItem[] = recentPartners.map((p: Partner) => ({
    id: `partner-${p.id}`,
    type: 'partner',
    action: isNew(p.createdAt, p.updatedAt) ? 'created' : 'updated',
    title: p.name,
    timestamp: p.updatedAt,
  }));

  const contactActivities: ActivityItem[] = recentContacts.map((c: ContactSubmission) => ({
    id: `contact-${c.id}`,
    type: 'contact',
    action: 'received',
    title: c.companyName,
    description: `From: ${c.email}`,
    timestamp: c.createdAt,
  }));

  const allActivities = [...productActivities, ...partnerActivities, ...contactActivities];

  // Sort all activities by timestamp descending and take the top 'limit'
  return allActivities
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);
} 
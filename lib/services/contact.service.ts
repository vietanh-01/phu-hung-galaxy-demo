import prisma from '@/lib/db';

export async function getRecentContactSubmissions(limit: number = 5) {
  return prisma.contactSubmission.findMany({
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getUnreadContactSubmissions(limit: number = 10) {
  return prisma.contactSubmission.findMany({
    where: {
      isRead: false,
    },
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function markContactAsRead(id: string) {
  return prisma.contactSubmission.update({
    where: { id },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  });
}

export async function getContactSubmissionsCount() {
  return prisma.contactSubmission.count();
}

export async function getUnreadContactSubmissionsCount() {
  return prisma.contactSubmission.count({
    where: {
      isRead: false,
    },
  });
} 
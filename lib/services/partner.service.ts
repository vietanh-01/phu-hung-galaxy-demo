import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';

export async function getPartners(args: Prisma.PartnerFindManyArgs = {}) {
  const { orderBy = { createdAt: 'desc' }, ...rest } = args;
  return prisma.partner.findMany({
    orderBy,
    ...rest,
  });
}

export async function getPartnersCount(args: Prisma.PartnerCountArgs = {}) {
    return prisma.partner.count({ ...args });
}

export async function getPartnerById(id: string) {
  return prisma.partner.findUnique({
    where: { id },
  });
}

export async function createPartner(data: { name: string; logoUrl: string }) {
  return prisma.partner.create({
    data,
  });
}

export async function updatePartnerById(id: string, data: { name: string; logoUrl: string }) {
  return prisma.partner.update({
    where: { id },
    data,
  });
}

export async function deletePartnerById(id: string) {
  return prisma.partner.delete({ where: { id } });
} 
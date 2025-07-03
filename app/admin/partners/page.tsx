import * as partnerService from '@/lib/services/partner.service';
import PartnersClient from './PartnersClient';
import { Prisma } from '@prisma/client';

export default async function PartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = 10;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const [sortField, sortDirection] =
    typeof params.sort === 'string' ? params.sort.split(':') : ['createdAt', 'desc'];

  const where: Prisma.PartnerWhereInput = search
    ? { name: { contains: search, mode: 'insensitive' } }
    : {};

  const orderBy: Prisma.PartnerOrderByWithRelationInput = { [sortField]: sortDirection };

  const partners = await partnerService.getPartners({
    where,
    orderBy,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
  const totalCount = await partnerService.getPartnersCount({ where });

  return <PartnersClient partners={partners} totalCount={totalCount} pageSize={pageSize} />;
} 
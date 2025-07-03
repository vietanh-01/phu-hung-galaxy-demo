import PartnerForm from '../../_components/PartnerForm';
import { notFound } from 'next/navigation';
import * as partnerService from '@/lib/services/partner.service';
import { PageHeader } from '../../../_components/ui/PageHeader';
import { Card, CardContent } from '../../../_components/ui/Card';

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await partnerService.getPartnerById(id);
  if (!partner) return notFound();
  
  return (
    <>
      <PageHeader title="Edit Partner"/>
      <Card>
        <CardContent className="pt-6">
          <PartnerForm partner={partner} />
        </CardContent>
      </Card>
    </>
  );
} 
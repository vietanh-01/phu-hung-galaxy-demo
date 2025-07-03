import PartnerForm from '../_components/PartnerForm';
import { PageHeader } from '../../_components/ui/PageHeader';
import { Card, CardContent } from '../../_components/ui/Card';

export default async function NewPartnerPage() {
  return (
    <>
      <PageHeader title="Add New Partner" />
      <Card>
        <CardContent className="pt-6">
          <PartnerForm />
        </CardContent>
      </Card>
    </>
  );
} 
import { PageHeader } from '@/app/admin/_components/ui/PageHeader';
import { getHomepageContent } from '@/lib/services/contentBlock.service';
import HomepageForm from './_components/HomepageForm';

export default async function HomepageEditorPage() {
  const content = await getHomepageContent();

  return (
    <>
      <PageHeader
        title="Chỉnh sửa Trang chủ"
        subtitle="Quản lý nội dung hiển thị trên trang chủ của website."
      />
      <HomepageForm initialContent={content} />
    </>
  );
} 
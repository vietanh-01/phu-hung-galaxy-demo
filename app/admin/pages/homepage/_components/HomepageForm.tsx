'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import { updateHomepageContent, type HomepageContentFormState } from '@/lib/actions/contentBlock.actions';
import { HomepageContent } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/admin/_components/ui/Card';
import { Input } from '@/app/admin/_components/ui/Input';
import { Textarea } from '@/app/admin/_components/ui/Textarea';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { Button } from '@/app/admin/_components/ui/Button';

interface HomepageFormProps {
  initialContent: HomepageContent;
}

const initialState: HomepageContentFormState = {
  message: '',
  errors: undefined,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? 'Đang lưu...' : 'Lưu thay đổi'}
    </Button>
  );
}

export default function HomepageForm({ initialContent }: HomepageFormProps) {
  const [state, formAction] = useFormState(updateHomepageContent, initialState);
  const [aboutContent, setAboutContent] = useState(initialContent.about_main_content);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="hero_main_title" className="block text-sm font-medium text-gray-700 mb-1">
              Tiêu đề chính
            </label>
            <Input
              id="hero_main_title"
              name="hero_main_title"
              defaultValue={initialContent.hero_main_title}
            />
            {state.errors?.hero_main_title && (
              <p className="text-red-500 text-sm mt-1">{state.errors.hero_main_title[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="hero_main_subtitle" className="block text-sm font-medium text-gray-700 mb-1">
              Tiêu đề phụ
            </label>
            <Textarea
              id="hero_main_subtitle"
              name="hero_main_subtitle"
              defaultValue={initialContent.hero_main_subtitle}
              rows={3}
            />
            {state.errors?.hero_main_subtitle && (
              <p className="text-red-500 text-sm mt-1">{state.errors.hero_main_subtitle[0]}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="about_main_title" className="block text-sm font-medium text-gray-700 mb-1">
              Tiêu đề mục "Về chúng tôi"
            </label>
            <Input
              id="about_main_title"
              name="about_main_title"
              defaultValue={initialContent.about_main_title}
            />
            {state.errors?.about_main_title && (
              <p className="text-red-500 text-sm mt-1">{state.errors.about_main_title[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="about_main_content" className="block text-sm font-medium text-gray-700 mb-1">
              Nội dung mục "Về chúng tôi"
            </label>
            <RichTextEditor content={aboutContent} onChange={setAboutContent} />
            <input type="hidden" name="about_main_content" value={aboutContent} />
            {state.errors?.about_main_content && (
              <p className="text-red-500 text-sm mt-1">{state.errors.about_main_content[0]}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
} 
'use server';

import { revalidatePath } from 'next/cache';
import { HomepageContentSchema } from '../schemas';
import { HomepageContent } from '../types';
import { z } from 'zod';
import prisma from '../db';

export type HomepageContentFormState = {
  message: string;
  errors?: z.ZodError<HomepageContent>['formErrors']['fieldErrors'];
  success: boolean;
};

export async function updateHomepageContent(
  prevState: HomepageContentFormState,
  formData: FormData
): Promise<HomepageContentFormState> {
  const data = {
    hero_main_title: formData.get('hero_main_title'),
    hero_main_subtitle: formData.get('hero_main_subtitle'),
    about_main_title: formData.get('about_main_title'),
    about_main_content: formData.get('about_main_content'),
  };
  const validatedFields = HomepageContentSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    hero_main_title,
    hero_main_subtitle,
    about_main_title,
    about_main_content,
  } = validatedFields.data;

  try {
    await prisma.$transaction([
      prisma.contentBlock.upsert({
        where: { blockType_identifier: { blockType: 'hero', identifier: 'main' } },
        update: { title: hero_main_title, subtitle: hero_main_subtitle },
        create: { blockType: 'hero', identifier: 'main', title: hero_main_title, subtitle: hero_main_subtitle, isActive: true },
      }),
      prisma.contentBlock.upsert({
        where: { blockType_identifier: { blockType: 'about', identifier: 'main' } },
        update: { title: about_main_title, content: about_main_content },
        create: { blockType: 'about', identifier: 'main', title: about_main_title, content: about_main_content, isActive: true },
      }),
    ]);

    revalidatePath('/');
    revalidatePath('/admin/pages/homepage');
    return { success: true, message: 'Nội dung trang chủ đã được cập nhật thành công.', errors: undefined };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lỗi cơ sở dữ liệu: Không thể cập nhật nội dung trang chủ.', errors: undefined };
  }
}
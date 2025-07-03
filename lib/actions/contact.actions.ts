'use server';

import prisma from '@/lib/db';
import { ContactFormSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

export type ContactFormState = {
  message: string;
  errors?: {
    companyName?: string[];
    phone?: string[];
    email?: string[];
    message?: string[];
  };
  success: boolean;
};

export async function createContactSubmission(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse({
    companyName: formData.get('companyName'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    await prisma.contactSubmission.create({ data: validatedFields.data });
    return { message: 'Tin nhắn của bạn đã được gửi thành công!', success: true, errors: undefined };
  } catch (error) {
    return { message: 'Lỗi máy chủ: Không thể gửi tin nhắn.', success: false, errors: undefined };
  }
}

export async function markContactAsRead(id: string) {
  try {
    await prisma.contactSubmission.update({
      where: { id },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
    revalidatePath('/admin');
    return { success: true, message: 'Đã đánh dấu tin nhắn là đã đọc.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lỗi khi đánh dấu tin nhắn.' };
  }
}

export async function markAllContactsAsRead() {
  try {
    await prisma.contactSubmission.updateMany({
      where: { isRead: false },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
    revalidatePath('/admin');
    return { success: true, message: 'Đã đánh dấu tất cả tin nhắn là đã đọc.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lỗi khi đánh dấu tin nhắn.' };
  }
} 
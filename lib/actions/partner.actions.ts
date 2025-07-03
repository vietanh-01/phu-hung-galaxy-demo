'use server';

import { revalidatePath } from 'next/cache';
import {
  createPartner as createPartnerInDb,
  updatePartnerById,
  deletePartnerById,
} from '@/lib/services/partner.service';
import { PartnerSchema } from '@/lib/schemas';

export type PartnerFormState = {
  message: string;
  errors?: {
    name?: string[];
    logoUrl?: string[];
    id?: string[];
  };
  success: boolean;
};

export async function createPartner(prevState: PartnerFormState, formData: FormData): Promise<PartnerFormState> {
  const validatedFields = PartnerSchema.safeParse({
    name: formData.get('name'),
    logoUrl: formData.get('logoUrl'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid data. Please check the fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await createPartnerInDb(validatedFields.data);

  revalidatePath('/admin/partners');
  revalidatePath('/');
  return { success: true, message: 'Partner created successfully.', errors: undefined };
}

export async function updatePartner(prevState: PartnerFormState, formData: FormData): Promise<PartnerFormState> {
  const validatedFields = PartnerSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    logoUrl: formData.get('logoUrl'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid data. Please check the fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, ...data } = validatedFields.data;
  if (!id) {
    return { success: false, message: 'Partner ID is required for an update.' };
  }

  await updatePartnerById(id, data);

  revalidatePath('/admin/partners');
  revalidatePath(`/admin/partners/edit/${id}`);
  revalidatePath('/');
  return { success: true, message: 'Partner updated successfully.', errors: undefined };
}

export async function deletePartner(id: string) {
  if (!id) return { success: false, message: 'Partner ID not provided' };
  try {
    await deletePartnerById(id);
    revalidatePath('/admin/partners');
    revalidatePath('/');
    return { success: true, message: 'Partner deleted successfully.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to delete partner.' };
  }
} 
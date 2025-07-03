'use server';

import { revalidatePath } from 'next/cache';
import {
  createCategory as createCategoryInDb,
  deleteCategoryById,
  updateCategoryById,
} from '@/lib/services/category.service';
import { CategorySchema } from '@/lib/schemas';

export type CategoryFormState = {
  message: string;
  errors?: {
    name?: string[];
    id?: string[];
  };
  success: boolean;
};

export async function createCategory(prevState: CategoryFormState, formData: FormData): Promise<CategoryFormState> {
  const validatedFields = CategorySchema.omit({id: true}).safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid data. Please check the fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await createCategoryInDb({ name: validatedFields.data.name });
  revalidatePath('/admin/categories');
  return { success: true, message: 'Category created successfully.', errors: undefined };
}

export async function updateCategory(prevState: CategoryFormState, formData: FormData): Promise<CategoryFormState> {
  const validatedFields = CategorySchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid data',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, name } = validatedFields.data;
  if (!id) {
    return { success: false, message: 'Category ID is required for an update.' };
  }
  await updateCategoryById(id, { name });
  revalidatePath('/admin/categories');
  revalidatePath(`/admin/categories/edit/${id}`);
  return { success: true, message: 'Category updated successfully.', errors: undefined };
}

export async function deleteCategory(id: string) {
  if (!id) return { success: false, message: 'ID is required' };

  try {
    await deleteCategoryById(id);
    revalidatePath('/admin/categories');
    return { success: true, message: 'Category deleted successfully.' };
  } catch (error) {
    // This could happen if e.g. a product is still using the category
    return { success: false, message: 'Could not delete category. Make sure no products are using it.' };
  }
} 
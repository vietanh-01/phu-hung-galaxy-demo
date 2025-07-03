'use server';

import { revalidatePath } from 'next/cache';
import { ProductSchema } from '../schemas';
import * as productService from '@/lib/services/product.service';

export type ProductFormState = {
  message: string;
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    imageUrl?: string[];
    categoryId?: string[];
    batchCode?: string[];
    rating?: string[];
    reviewCount?: string[];
    statusTag?: string[];
    id?: string[];
  };
  success: boolean;
};

export async function createProduct(prevState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const validatedFields = ProductSchema.omit({ id: true }).safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    imageUrl: formData.get('imageUrl'),
    categoryId: formData.get('categoryId'),
    batchCode: formData.get('batchCode'),
    rating: formData.get('rating'),
    reviewCount: formData.get('reviewCount'),
    statusTag: formData.get('statusTag'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check the fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, price, imageUrl, categoryId, batchCode, rating, reviewCount, statusTag } = validatedFields.data;

  try {
    await productService.createProduct({ name, description, price, imageUrl, categoryId, batchCode, rating, reviewCount, statusTag });
    revalidatePath('/admin/products');
    revalidatePath('/'); // Products are on home page
    return { success: true, message: 'Product created successfully.', errors: undefined };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Database error: Failed to create product.', errors: undefined };
  }
}

export async function updateProduct(prevState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const validatedFields = ProductSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    imageUrl: formData.get('imageUrl'),
    categoryId: formData.get('categoryId'),
    batchCode: formData.get('batchCode'),
    rating: formData.get('rating'),
    reviewCount: formData.get('reviewCount'),
    statusTag: formData.get('statusTag'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, ...data } = validatedFields.data;
  if (!id) {
    return {
      success: false,
      message: 'Product ID is missing.',
      errors: { id: ['Product ID is missing.'] }
    };
  }

  try {
    await productService.updateProductById(id, data);
    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/edit/${id}`);
    revalidatePath('/'); // Products are on home page
    return { success: true, message: 'Product updated successfully.', errors: undefined };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Database error: Failed to update product.', errors: undefined };
  }
}

export async function deleteProduct(id: string) {
  try {
    await productService.deleteProductById(id);
    revalidatePath('/admin/products');
    revalidatePath('/'); // Products are on home page
    return { success: true, message: 'Product deleted successfully.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Database error: Failed to delete product.' };
  }
} 
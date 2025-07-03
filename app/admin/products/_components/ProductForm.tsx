'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Category, Product } from '@prisma/client';
import { ImageUploader } from '@/components/ui/ImageUploader';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { createProduct, updateProduct, type ProductFormState } from '@/lib/actions/productActions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Input } from '../../_components/ui/Input';
import { Button } from '../../_components/ui/Button';
import { Select } from '../../_components/ui/Select';

// Serialized product type where Decimal fields are converted to numbers
type SerializedProduct = Omit<Product, 'price'> & {
  price: number;
};

interface ProductFormProps {
  product?: SerializedProduct | null;
  categories: Category[];
}

const initialState: ProductFormState = {
  message: '',
  errors: undefined,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Product'}
    </Button>
  );
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const action = product ? updateProduct : createProduct;
  const [state, formAction] = useFormState(action, initialState);

  const [description, setDescription] = useState(product?.description || '');
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || 'Product saved successfully!');
      router.push('/admin/products');
    }
    if (!state.success && state.message && !state.errors) {
      // This will show general errors, e.g. database errors, but not validation summaries
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="description" value={description} />
      <input type="hidden" name="imageUrl" value={imageUrl} />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <Input type="text" name="name" id="name" required defaultValue={product?.name} />
        {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <RichTextEditor content={description} onChange={setDescription} />
        {state.errors?.description && <p className="text-red-500 text-sm mt-1">{state.errors.description[0]}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <Input type="number" name="price" id="price" required step="0.01" defaultValue={product?.price.toString()} />
          {state.errors?.price && <p className="text-red-500 text-sm mt-1">{state.errors.price[0]}</p>}
        </div>
        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <Select name="categoryId" id="categoryId" required defaultValue={product?.categoryId}>
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </Select>
          {state.errors?.categoryId && <p className="text-red-500 text-sm mt-1">{state.errors.categoryId[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="batchCode" className="block text-sm font-medium text-gray-700 mb-1">Batch Code</label>
          <Input type="text" name="batchCode" id="batchCode" defaultValue={product?.batchCode || ''} />
          {state.errors?.batchCode && <p className="text-red-500 text-sm mt-1">{state.errors.batchCode[0]}</p>}
        </div>
        <div>
          <label htmlFor="statusTag" className="block text-sm font-medium text-gray-700 mb-1">Status Tag</label>
          <Select name="statusTag" id="statusTag" defaultValue={product?.statusTag || ''}>
            <option value="">No Status</option>
            <option value="MỚI">MỚI</option>
            <option value="BÁN CHẠY">BÁN CHẠY</option>
            <option value="KHUYẾN MÃI">KHUYẾN MÃI</option>
            <option value="HẾT HÀNG">HẾT HÀNG</option>
          </Select>
          {state.errors?.statusTag && <p className="text-red-500 text-sm mt-1">{state.errors.statusTag[0]}</p>}
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
          <Input type="number" name="rating" id="rating" step="0.1" min="0" max="5" defaultValue={product?.rating?.toString() || ''} />
          {state.errors?.rating && <p className="text-red-500 text-sm mt-1">{state.errors.rating[0]}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="reviewCount" className="block text-sm font-medium text-gray-700 mb-1">Review Count</label>
        <Input type="number" name="reviewCount" id="reviewCount" min="0" defaultValue={product?.reviewCount?.toString() || ''} />
        {state.errors?.reviewCount && <p className="text-red-500 text-sm mt-1">{state.errors.reviewCount[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
        <div className="mt-1 p-4 border-2 border-dashed border-gray-300 rounded-md">
          <ImageUploader name="imageUrl" onUpload={setImageUrl} initialImageUrl={imageUrl} />
        </div>
        {state.errors?.imageUrl && <p className="text-red-500 text-sm mt-1">{state.errors.imageUrl[0]}</p>}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/products')}>Cancel</Button>
        <SubmitButton />
      </div>
    </form>
  );
} 
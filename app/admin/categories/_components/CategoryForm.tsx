'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createCategory, updateCategory, type CategoryFormState } from '@/lib/actions/category.actions';
import { Input } from '../../_components/ui/Input';
import { Button } from '../../_components/ui/Button';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface CategoryFormProps {
  category?: Category | null;
}

const initialState: CategoryFormState = {
  message: '',
  errors: undefined,
  success: false,
};

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (isEditing ? 'Saving...' : 'Adding...') : (isEditing ? 'Save Category' : 'Add Category')}
    </Button>
  );
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(
    category ? updateCategory : createCategory,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || `Category ${category ? 'updated' : 'created'} successfully!`);
      router.push('/admin/categories');
    }
    if (!state.success && state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, router, category]);

  return (
    <form action={formAction} className="space-y-4">
      {category && <input type="hidden" name="id" value={category.id} />}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
        <Input type="text" name="name" id="name" required defaultValue={category?.name} />
        {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>}
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/categories')}>Cancel</Button>
        <SubmitButton isEditing={!!category} />
      </div>
      {state.message && !state.success && !state.errors && (
        <p className="text-sm text-red-600 mt-2">{state.message}</p>
      )}
    </form>
  );
} 
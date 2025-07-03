'use client';

import React, { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { ImageUploader } from '@/components/ui/ImageUploader';
import { createPartner, updatePartner, type PartnerFormState } from '@/lib/actions/partner.actions';
import { Input } from '../../_components/ui/Input';
import { Button } from '../../_components/ui/Button';
import { Partner } from '@prisma/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const initialState: PartnerFormState = {
  message: '',
  errors: undefined,
  success: false,
};

interface PartnerFormProps {
  partner?: Partner | null;
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (isEditing ? 'Saving...' : 'Adding...') : (isEditing ? 'Save Partner' : 'Add Partner')}
    </Button>
  );
}

export default function PartnerForm({ partner }: PartnerFormProps) {
  const router = useRouter();
  const action = partner ? updatePartner : createPartner;
  const [state, formAction] = useFormState(action, initialState);
  const [logoUrl, setLogoUrl] = useState(partner?.logoUrl || '');

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || `Partner ${partner ? 'updated' : 'created'} successfully!`);
      router.push('/admin/partners');
    }
    if (!state.success && state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, router, partner]);

  return (
    <form action={formAction} className="space-y-4">
      {partner && <input type="hidden" name="id" value={partner.id} />}
      <input type="hidden" name="logoUrl" value={logoUrl} />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Partner Name
        </label>
        <Input
          type="text"
          name="name"
          id="name"
          required
          defaultValue={partner?.name}
        />
        {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
        <ImageUploader
          name="logoUrl"
          onUpload={setLogoUrl}
          initialImageUrl={logoUrl}
        />
        {state.errors?.logoUrl && <p className="text-red-500 text-sm mt-1">{state.errors.logoUrl[0]}</p>}
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/partners')}>Cancel</Button>
        <SubmitButton isEditing={!!partner} />
      </div>
      {state.message && !state.success && !state.errors && (
        <p className="text-sm text-red-600 mt-2">{state.message}</p>
      )}
    </form>
  );
} 
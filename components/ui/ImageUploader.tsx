'use client';

import { optimizeCloudinaryImage } from '@/lib/utils';
import { useState } from 'react';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  initialImageUrl?: string | null;
  name: string;
}

export function ImageUploader({ onUpload, initialImageUrl, name }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const paramsToSign = { timestamp };
      
      const res = await fetch('/api/admin/sign-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paramsToSign }),
      });

      const { signature } = await res.json();

      if (!signature) {
        throw new Error('Failed to get upload signature.');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (uploadData.secure_url) {
        const url = uploadData.secure_url;
        setImageUrl(url);
        onUpload(url);
      } else {
        throw new Error(uploadData.error.message || 'Cloudinary upload failed.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during upload.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {imageUrl && <img src={optimizeCloudinaryImage(imageUrl, 'w_96,h_96,c_fill,q_auto,f_auto')} alt="Preview" className="h-24 w-24 object-cover rounded-md mb-2" />}
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
      {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
} 
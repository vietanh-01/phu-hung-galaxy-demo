import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().nullish(),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  imageUrl: z.string().url('Must be a valid URL').min(1, 'Image is required'),
  categoryId: z.string().min(1, 'Category is required'),
  batchCode: z.string().optional().nullable(),
  rating: z.coerce.number().min(0).max(5).optional().nullable(),
  reviewCount: z.coerce.number().min(0).optional().nullable(),
  statusTag: z.string().optional().nullable(),
});

export const CategorySchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
});

export const PartnerSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
    logoUrl: z.string().url('Must be a valid URL').min(1, 'Logo is required'),
});

export const ContactFormSchema = z.object({
    companyName: z.string().min(1, 'Company name is required'),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(1, 'Message is required'),
});

export const ContentBlockSchema = z.object({
    id: z.string().optional(),
    blockType: z.string().min(1, 'Block type is required'),
    identifier: z.string().min(1, 'Identifier is required'),
    title: z.string().optional().nullable(),
    content: z.string().optional().nullable(),
    subtitle: z.string().optional().nullable(),
    data: z.record(z.any()).optional().nullable(),
    isActive: z.boolean().default(true),
    order: z.number().default(0),
}); 

export const HomepageContentSchema = z.object({
    hero_main_title: z.string().optional(),
    hero_main_subtitle: z.string().optional(),
    about_main_title: z.string().optional(),
    about_main_content: z.string().optional(),
});
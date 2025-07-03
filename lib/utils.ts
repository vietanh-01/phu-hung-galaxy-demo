export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function optimizeCloudinaryImage(url: string, transformations: string): string {
  if (!url || !url.includes('res.cloudinary.com')) {
    return url;
  }
  const parts = url.split('/upload/');
  if (parts.length !== 2) {
    return url;
  }
  return `${parts[0]}/upload/${transformations}/${parts[1]}`;
} 
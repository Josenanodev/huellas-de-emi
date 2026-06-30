const MAX_IMAGE_COUNT = 6;
const MAX_STORED_IMAGE_CHARS = 450 * 1024;
const MAX_URL_LENGTH = 2048;
const ALLOWED_DATA_URL_PATTERN = /^data:image\/(?:jpeg|jpg|png|webp);base64,/i;

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function validateImageValue(image: unknown): string {
  if (typeof image !== 'string') {
    throw new Error('Invalid image');
  }

  const trimmedImage = image.trim();
  if (!trimmedImage) {
    throw new Error('Invalid image');
  }

  if (isValidHttpUrl(trimmedImage)) {
    if (trimmedImage.length > MAX_URL_LENGTH) {
      throw new Error('Image URL too long');
    }

    return trimmedImage;
  }

  if (!ALLOWED_DATA_URL_PATTERN.test(trimmedImage)) {
    throw new Error('Invalid image');
  }

  if (trimmedImage.length > MAX_STORED_IMAGE_CHARS) {
    throw new Error('Stored image too large');
  }

  return trimmedImage;
}

export function sanitizePetImages(images: unknown): string[] {
  if (images === undefined) return [];
  if (!Array.isArray(images)) {
    throw new Error('Invalid image');
  }

  if (images.length > MAX_IMAGE_COUNT) {
    throw new Error('Too many images');
  }

  return images.map(validateImageValue);
}

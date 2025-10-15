// ImageKit configuration for cloud image storage
// Documentation: https://docs.imagekit.io/

interface ImageKitConfig {
  publicKey: string;
  privateKey: string;
  urlEndpoint: string;
}

// Initialize ImageKit (will be set up after installing the package)
export function getImageKitConfig(): ImageKitConfig {
  const config = {
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
  };

  // Only validate at runtime, not during build
  // This allows builds to complete even without ImageKit configured
  return config;
}

// Runtime validation helper
export function validateImageKitConfig(): void {
  const config = getImageKitConfig();
  if (!config.publicKey || !config.privateKey || !config.urlEndpoint) {
    console.warn('ImageKit configuration is incomplete. Image uploads will not work until environment variables are set.');
  }
}

// Image upload configuration
export const IMAGE_UPLOAD_CONFIG = {
  // Maximum file size in bytes (10MB)
  maxFileSize: 10 * 1024 * 1024,
  
  // Allowed file types
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  
  // Image transformations
  transformations: {
    thumbnail: 'tr:w-300,h-200,c-at_max',
    card: 'tr:w-400,h-300,c-at_max,q-85',
    detail: 'tr:w-1200,h-800,c-at_max,q-90',
    hero: 'tr:w-1920,h-1080,c-at_max,q-90',
  },
  
  // Upload folders
  folders: {
    listings: '/listings',
    profiles: '/profiles',
    documents: '/documents',
  },
};

// Generate secure upload signature (server-side only)
export async function generateUploadSignature(
  fileName: string,
  folder: string
): Promise<{ signature: string; expire: number; token: string }> {
  const crypto = await import('crypto');
  const config = getImageKitConfig();
  
  const expire = Math.floor(Date.now() / 1000) + 2400; // 40 minutes
  const token = crypto.randomBytes(16).toString('hex');
  
  const privateAPIKey = config.privateKey;
  const stringToSign = `fileName=${fileName}&folder=${folder}&expire=${expire}&token=${token}`;
  
  const signature = crypto
    .createHmac('sha1', privateAPIKey)
    .update(stringToSign)
    .digest('hex');
  
  return { signature, expire, token };
}

// Build ImageKit URL with transformations
export function buildImageUrl(
  fileId: string,
  transformation?: keyof typeof IMAGE_UPLOAD_CONFIG.transformations
): string {
  const config = getImageKitConfig();
  const baseUrl = `${config.urlEndpoint}/${fileId}`;
  
  if (transformation && IMAGE_UPLOAD_CONFIG.transformations[transformation]) {
    return `${baseUrl}?${IMAGE_UPLOAD_CONFIG.transformations[transformation]}`;
  }
  
  return baseUrl;
}

// Validate file before upload
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > IMAGE_UPLOAD_CONFIG.maxFileSize) {
    return {
      valid: false,
      error: `File size exceeds ${IMAGE_UPLOAD_CONFIG.maxFileSize / (1024 * 1024)}MB limit`,
    };
  }
  
  // Check file type
  if (!IMAGE_UPLOAD_CONFIG.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed. Allowed types: ${IMAGE_UPLOAD_CONFIG.allowedTypes.join(', ')}`,
    };
  }
  
  return { valid: true };
}

// Client-side upload parameters
export function getClientUploadParams(folder: string = IMAGE_UPLOAD_CONFIG.folders.listings) {
  const config = getImageKitConfig();
  
  return {
    publicKey: config.publicKey,
    urlEndpoint: config.urlEndpoint,
    folder,
    useUniqueFileName: true,
    tags: ['web-upload'],
    responseFields: 'fileId,name,size,filePath,url,thumbnailUrl,fileType,width,height',
  };
}

export interface UploadedImage {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  filePath: string;
  fileType: string;
  size: number;
  width: number;
  height: number;
}
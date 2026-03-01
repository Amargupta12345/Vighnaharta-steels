// Image utility for handling product images with Next.js Image optimization
// Supports both local static files and CDN URLs

export interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

// Image size presets for different use cases
export const ImageSizes = {
  // Product card thumbnail (grid view)
  productCard: {
    width: 400,
    height: 300,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  },
  // Product detail hero image
  productDetail: {
    width: 800,
    height: 600,
    sizes: '(max-width: 768px) 100vw, 80vw'
  },
  // Carousel image
  carousel: {
    width: 600,
    height: 400,
    sizes: '(max-width: 768px) 100vw, 90vw'
  },
  // Banner/Hero image
  banner: {
    width: 1200,
    height: 600,
    sizes: '100vw'
  },
  // Thumbnail (small)
  thumbnail: {
    width: 200,
    height: 150,
    sizes: '(max-width: 768px) 50vw, 200px'
  }
};

// Helper to check if image is from CDN
export function isCDNUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

// Helper to get optimized image path
export function getOptimizedImagePath(
  imagePath: string,
  size: keyof typeof ImageSizes = 'productCard'
): ImageConfig {
  const config = ImageSizes[size];

  return {
    src: imagePath,
    alt: imagePath.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp)$/i, '') || 'Product image',
    width: config.width,
    height: config.height
  };
}

// CDN Configuration (optional - for production)
export const CDN_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_USE_CDN === 'true',
  baseUrl: process.env.NEXT_PUBLIC_CDN_URL || '',
  // Image transformation parameters (if using Cloudinary, Imgix, etc.)
  transformations: {
    quality: 85,
    format: 'auto', // auto converts to WebP when supported
  }
};

// Get image URL (local or CDN)
export function getImageUrl(imagePath: string): string {
  // If it's already a full URL, return as is
  if (isCDNUrl(imagePath)) {
    return imagePath;
  }

  // If CDN is enabled and configured, use CDN
  if (CDN_CONFIG.enabled && CDN_CONFIG.baseUrl) {
    return `${CDN_CONFIG.baseUrl}${imagePath}`;
  }

  // Otherwise use local static path
  return imagePath;
}



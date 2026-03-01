# Image Management Guide

## 📁 Folder Structure

Place your product images in:
```
public/
├── assets/
│   └── images/
│       └── products/
│           ├── steel-i-beams/
│           │   ├── hero.jpg (800x600)
│           │   ├── thumbnail.jpg (200x150)
│           │   └── gallery/
│           │       ├── image-1.jpg
│           │       ├── image-2.jpg
│           │       └── image-3.jpg
│           ├── steel-rods/
│           │   ├── hero.jpg
│           │   └── thumbnail.jpg
│           └── ...
```

## 🎯 Best Practices

### 1. **Local Static Files (Recommended for MVP)**
- ✅ Fast loading
- ✅ No external dependencies
- ✅ Works offline
- ✅ Free hosting
- ⚠️ Increases bundle size

**Use when:**
- Starting out
- Small number of images (< 50)
- Images < 500KB each

### 2. **CDN (Recommended for Production)**
- ✅ Faster global delivery
- ✅ Automatic optimization
- ✅ Responsive images
- ✅ Bandwidth savings
- ⚠️ Monthly costs

**Popular CDN Options:**
- **Cloudinary** (Free tier: 25GB storage, 25GB bandwidth)
- **Imgix** (Free tier: 75GB bandwidth)
- **Cloudflare Images** (Free tier: 100k images/month)
- **AWS CloudFront + S3** (Pay-as-you-go)

## 🖼️ Image Optimization

### Recommended Image Sizes:
- **Hero/Detail**: 1200x800px (JPG/WebP, ~200KB)
- **Card/Grid**: 600x400px (JPG/WebP, ~80KB)
- **Thumbnail**: 300x200px (JPG/WebP, ~30KB)

### Format Priority:
1. **WebP** (best compression, modern browsers)
2. **AVIF** (even better, newer browsers)
3. **JPG** (fallback, universal support)
4. **PNG** (only if transparency needed)

## 📝 Next.js Image Component Benefits

- ✅ Automatic optimization
- ✅ Lazy loading
- ✅ Responsive images
- ✅ WebP conversion
- ✅ Blur placeholder support

## 🔧 Usage Examples

See `src/utils/imageUtils.ts` for helper functions.

### Basic Usage:
```tsx
import Image from 'next/image';
import { ImageSizes } from '@/utils/imageUtils';

<Image
  src="/assets/images/products/steel-i-beams/hero.jpg"
  alt="Steel I-Beams"
  width={ImageSizes.productDetail.width}
  height={ImageSizes.productDetail.height}
  sizes={ImageSizes.productDetail.sizes}
  priority={true} // For above-the-fold images
/>
```

### With CDN:
```tsx
import Image from 'next/image';
import { getImageUrl, ImageSizes } from '@/utils/imageUtils';

<Image
  src={getImageUrl('/assets/images/products/steel-i-beams/hero.jpg')}
  alt="Steel I-Beams"
  width={ImageSizes.productDetail.width}
  height={ImageSizes.productDetail.height}
/>
```



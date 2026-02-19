# 📷 Adding Images to Tanea Spa

This guide explains how to add images to your Tanea Spa website.

## 📁 Folder Structure

Create images in the `public` folder:

```
public/
├── images/
│   ├── hero-bg.jpg              # Hero section background
│   ├── gallery-1.jpg            # Gallery images (1-6 needed)
│   ├── gallery-2.jpg
│   ├── gallery-3.jpg
│   ├── gallery-4.jpg
│   ├── gallery-5.jpg
│   ├── gallery-6.jpg
│   ├── terapis/
│   │   ├── dewi.jpg            # Therapist photos (4 needed)
│   │   ├── made.jpg
│   │   ├── putu.jpg
│   │   └── kadek.jpg
│   └── og-image.jpg            # SEO/Share image (1200x630)
```

## 🎨 Image Specifications

### Hero Background
- **Size**: 1920 x 1080px (16:9) minimum
- **Format**: JPG or WebP
- **Style**: Spa ambiance, warm tones, terracotta/gold accents

### Gallery Images (6 photos needed)
From Tanea Spa prompt:
1. **Hot Stone Therapy** - Hot stones on hands/table
2. **Spa Products Basket** - Natural oils, scrubs, balm
3. **Therapist Hands** - Close-up of hands during massage
4. **Plumeria (Kamboja) Flowers** - Frangipani blooms
5. **Herbal Tea Preparation** - Jamu being prepared
6. **Relaxing Ambiance** - Treatment room/candles

- **Size**: Minimum 800x1000px
- **Format**: JPG or WebP
- **Aspect**: Portrait (4:5 recommended)

### Therapist Photos (4 photos needed)
- **Size**: 200x200px square minimum
- **Format**: JPG or PNG
- **Style**: Professional headshot or spa uniform
- **Background**: Clean, solid or light blur
- **Faces**: Dewi (woman), Made (man), Putu (man), Kadek (man)

### OG Image (Social Media Share)
- **Size**: 1200 x 630px (1.91:1) - **Exact size required**
- **Format**: JPG
- **Content**: Tanea Spa logo + text "Resort Level Relaxation"

## 🖼️ How to Add Images

### Option 1: Manually Copy Files

1. Create folders in `public/images/` and `public/images/terapis/`
2. Copy your image files to the appropriate folders
3. Refresh the page - images will appear automatically

### Option 2: Use Terminal

```bash
# Create folders
mkdir -p public/images/terapis

# Copy images (example)
cp ~/Downloads/hero-bg.jpg public/images/
cp ~/Downloads/gallery-*.jpg public/images/
cp ~/Downloads/dewi.jpg public/images/terapis/
```

## 📸 Where Images Are Used

| Image File | Used In |
|-----------|----------|
| `hero-bg.jpg` | `components/landing/Hero.tsx` |
| `gallery-1.jpg` to `gallery-6.jpg` | `components/landing/Galeri.tsx` |
| `terapis/dewi.jpg`, etc. | `components/landing/TimKami.tsx` |
| `og-image.jpg` | `app/layout.tsx` (meta tags) |

## ✅ Image Checklist

Before deploying, ensure you have:

- [ ] `public/images/hero-bg.jpg`
- [ ] `public/images/gallery-1.jpg` through `gallery-6.jpg` (6 images)
- [ ] `public/images/terapis/dewi.jpg`
- [ ] `public/images/terapis/made.jpg`
- [ ] `public/images/terapis/putu.jpg`
- [ ] `public/images/terapis/kadek.jpg`
- [ ] `public/images/og-image.jpg` (1200x630px)

## 🚨 Troubleshooting

**Images not showing?**
1. Check file name matches exactly (case-sensitive)
2. Check file extension (.jpg vs .jpeg vs .png)
3. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)

**Images look blurry?**
- Ensure you're providing high-resolution source files
- Next.js Image component will handle optimization automatically

**Missing images?**
The app will still work! Missing images will show:
- Placeholder colored divs for gallery
- Initial letter placeholders for therapists

## 📐 Recommended Image Sources

For Tanea Spa branding:
- **Photography**: Warm, golden hour lighting
- **Colors**: Terracotta, cream, gold tones
- **Vibe**: Relaxing, luxurious, traditional Balinese elements

You can use:
- Unsplash.com - Free stock photos (search: "spa", "massage", "bali spa")
- Pexels.com - Free stock photos
- Hire a photographer for brand consistency

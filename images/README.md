# Images Directory

This directory contains all images used on the website.

## Required Images

### Hero Section
- **File**: `hero-bg.jpg`
- **Recommended Size**: 1920x1080px (Full HD)
- **Format**: JPG (optimized for web)
- **Description**: Background image for the hero section. Should show a stylish bar or event atmosphere.
- **Tips**: 
  - Use a dark or moody image that works well with text overlay
  - Compress the image to keep file size under 500KB
  - Consider using a video background instead (hero-bg.mp4)

### Portfolio Images

All portfolio images should be placed in the `portfolio/` subdirectory.

#### Dubai Opera Project
- **File**: `portfolio/dubai-opera-project.jpg`
- **Recommended Size**: 800x600px
- **Format**: JPG
- **Description**: Image showcasing the Dubai Opera project

#### Belcanto Project
- **File**: `portfolio/belcanto-project.jpg`
- **Recommended Size**: 800x600px
- **Format**: JPG
- **Description**: Image showcasing the Belcanto project

#### More Than Home Project
- **File**: `portfolio/more-than-home-project.jpg`
- **Recommended Size**: 800x600px
- **Format**: JPG
- **Description**: Image showcasing the More Than Home project

## Image Optimization Tips

1. **Compress Images**: Use tools like TinyPNG, ImageOptim, or Squoosh
2. **Proper Format**: 
   - Use JPG for photos
   - Use PNG for logos with transparency
   - Use WebP for better compression (with JPG fallback)
3. **Responsive Images**: Consider creating multiple sizes for different devices
4. **Alt Text**: Always include descriptive alt text in HTML

## Placeholder Images

If you don't have images yet, you can use placeholder services:
- https://placeholder.com/
- https://picsum.photos/
- https://unsplash.com/ (free stock photos)

Example placeholder URLs:
```
Hero: https://picsum.photos/1920/1080?random=1
Portfolio: https://picsum.photos/800/600?random=2
```

## Video Background (Optional)

For a more dynamic hero section, you can use a video background:

1. Add video file: `hero-bg.mp4`
2. Update `index.html` hero section:

```html
<div class="hero-background">
    <video autoplay muted loop playsinline>
        <source src="images/hero-bg.mp4" type="video/mp4">
    </video>
    <div class="hero-overlay"></div>
</div>
```

3. Update CSS for video:

```css
.hero-background video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

## Current Status

- [ ] Hero background image
- [ ] Dubai Opera portfolio image
- [ ] Belcanto portfolio image
- [ ] More Than Home portfolio image

Once all images are added, remove this README or update it with image credits.

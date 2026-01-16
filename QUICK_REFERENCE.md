# Quick Reference Guide

## 🚀 Getting Started

### Start Development Server
```bash
cd executive-inn
npm start
```
Visit: `http://localhost:3000`

### Stop Server
Press `Ctrl+C` in the terminal

### Build for Production
```bash
npm run build
```
Output in `build/` folder

## 📁 File Structure

```
src/
├── components/
│   ├── Header.tsx          - Hotel hero section
│   ├── Navigation.tsx      - Navigation bar
│   ├── PhotoGallery.tsx    - Image gallery
│   ├── RoomTypes.tsx       - Room showcase
│   ├── Amenities.tsx       - Amenities list
│   ├── HotelInfo.tsx       - Info section
│   ├── Contact.tsx         - Contact form
│   └── Footer.tsx          - Footer
├── App.tsx                 - Main component
├── App.css                 - Global styles
└── index.css               - Base styles
```

## 🎨 Customization Quick Links

### Change Hotel Name
File: `src/components/Header.tsx` (line ~24)

### Update Phone Number
Files: `Header.tsx`, `Footer.tsx`, `Contact.tsx`

### Change Address
Files: `Footer.tsx`, `Contact.tsx`

### Add Gallery Images
File: `src/components/PhotoGallery.tsx` (lines 14-45)
Replace image URLs with your hotel photos

### Update Room Types
File: `src/components/RoomTypes.tsx` (lines 12-38)

### Modify Amenities
File: `src/components/Amenities.tsx` (lines 6-43)

### Change Colors
Search for `#1e3a8a` (primary) and `#3b82f6` (secondary)
Replace in any component

## 📦 Installed Packages

```
@mui/joy              - Component library
@mui/icons-material   - Icons
@emotion/react        - CSS-in-JS
@emotion/styled       - Styled components
react                 - React core
typescript            - Type safety
```

## 🔧 Key Components Features

### Photo Gallery
- Filter by category
- Modal view
- Previous/Next navigation
- 9 sample images (replaceable)

### Room Types
- 3 room categories
- Feature lists
- Guest capacity
- Book buttons

### Amenities
- 8 amenities displayed
- Icons included
- Hover effects
- Responsive grid

### Contact Form
- Name, email, subject, message
- Phone & address display
- Email links
- Social media

## 📱 Responsive Breakpoints

| Breakpoint | Width | Device |
|-----------|-------|--------|
| xs | 0px | Mobile |
| sm | 600px | Tablet |
| md | 900px | Laptop |
| lg | 1200px+ | Desktop |

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #1e3a8a | Headers, main text |
| Light Blue | #3b82f6 | Accents, buttons |
| Background | #f8fafc | Light sections |
| Dark Text | #1e293b | Body text |
| Light Text | #64748b | Secondary text |

## 🏃 Common Tasks

### Add New Gallery Image
1. Open `PhotoGallery.tsx`
2. Add object to `galleryImages` array
3. Update id, title, category, image URL

### Add New Amenity
1. Open `Amenities.tsx`
2. Add object to `amenities` array
3. Import new icon from @mui/icons-material

### Add New Room Type
1. Open `RoomTypes.tsx`
2. Add object to `roomTypes` array
3. Update features list

### Change Logo/Brand Color
1. Search for color hex in all components
2. Replace with new color
3. Update gradient values

## 📞 Contact Information

**Current Values:**
- Phone: +1 (225) 771-1123
- Address: 430 Main St, Baker, LA 70714
- Email: info@executivebakerla.com
- Check-in: 3:00 PM
- Check-out: 11:00 AM

**Update these in multiple files:**
- `Header.tsx`
- `Contact.tsx`
- `Footer.tsx`
- `HotelInfo.tsx`

## 🌐 Navigation Links

The website has smooth scroll links to:
- `#home` - Navigation
- `#gallery` - Photo Gallery
- `#amenities` - Hotel Amenities
- `#rooms` - Room Types
- `#contact` - Contact Section

## 💾 Important Files to Backup

- `src/App.tsx` - Main component
- `src/components/*` - All components
- `package.json` - Dependencies
- `.env` - Environment variables (if added)

## 🐛 Troubleshooting

### Website Not Loading
- Check if server is running: `npm start`
- Clear browser cache (Ctrl+Shift+Del)
- Check browser console for errors

### Images Not Loading
- Verify image URLs are correct
- Use HTTPS URLs (not HTTP)
- Check image file exists
- Try using different image service

### Styling Issues
- Clear node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Clear browser cache

### Build Errors
- Check TypeScript errors in code editor
- Verify all imports are correct
- Ensure all components are properly exported

## 📚 Useful Resources

- React Docs: [react.dev](https://react.dev)
- MUI Joy UI: [mui.com/joy-ui](https://mui.com/joy-ui)
- TypeScript: [typescriptlang.org](https://www.typescriptlang.org)
- Material Icons: [fonts.google.com/icons](https://fonts.google.com/icons)

## ✅ Pre-Launch Checklist

- [ ] Replace all placeholder images
- [ ] Update hotel information
- [ ] Test all links and navigation
- [ ] Test on mobile devices
- [ ] Test contact form
- [ ] Check spelling and grammar
- [ ] Optimize images
- [ ] Set up email forwarding
- [ ] Configure analytics
- [ ] Deploy to production

## 🎯 Next Steps

1. **Customize Images** - Add your hotel photos
2. **Update Information** - Hotel details, hours, policies
3. **Configure Email** - Set up contact form
4. **Test Thoroughly** - Check all devices
5. **Deploy** - Choose hosting platform
6. **Monitor** - Set up analytics

---

Keep this guide handy for quick reference! 📋

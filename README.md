# Executive Inn and Suites Baker - Hotel Website

A modern, responsive hotel website built with React, TypeScript, and MUI Joy UI. This website showcases a beautiful photo gallery, room types, amenities, and contact information for the Executive Inn and Suites in Baker, Louisiana.

## 🎯 Features

- **Modern Design**: Built with the latest design patterns and MUI Joy UI framework
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Photo Gallery**: Interactive photo gallery with category filtering and modal view
- **Room Types**: Showcase different room categories with descriptions and features
- **Hotel Amenities**: Display of all available hotel amenities with icons and descriptions
- **Hotel Information**: Check-in/check-out times, pet policy, and hotel information
- **Contact Form**: Functional contact form with email, phone, and address information
- **Navigation**: Sticky navigation bar with smooth scrolling
- **Modern UI Components**: Uses MUI Joy UI for consistent and beautiful UI components

## 📋 Pages & Sections

1. **Navigation Bar** - Sticky header with smooth scroll links
2. **Hero Header** - Eye-catching header with hotel name and contact info
3. **Photo Gallery** - Filterable image gallery with modal view and navigation
4. **Room Types** - Displays different room categories (Standard, Deluxe, Suite)
5. **Hotel Amenities** - Grid of amenities with icons (WiFi, Parking, Fitness, etc.)
6. **Hotel Information** - Check-in/out times, policies, and about section
7. **Contact Section** - Contact form and hotel contact details
8. **Footer** - Social links, quick links, and copyright information

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd executive-inn
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📦 Dependencies

- **React**: ^19.2.0 - JavaScript library for building user interfaces
- **TypeScript**: ^4.9.5 - Typed superset of JavaScript
- **MUI Joy UI**: ^1.0.0+ - Beautiful React component library
- **MUI Icons**: Latest version - Material Design icons
- **Emotion**: ^11.x - CSS-in-JS styling solution

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.tsx           # Hero header section
│   ├── Navigation.tsx       # Navigation bar with menu
│   ├── PhotoGallery.tsx     # Interactive photo gallery
│   ├── RoomTypes.tsx        # Room types showcase
│   ├── Amenities.tsx        # Hotel amenities section
│   ├── HotelInfo.tsx        # Hotel information section
│   ├── Contact.tsx          # Contact form and info
│   └── Footer.tsx           # Footer section
├── App.tsx                  # Main app component
├── App.css                  # Global app styles
├── index.css                # Global styles
└── index.tsx                # React entry point
```

## 🎨 Design Highlights

- **Color Scheme**: Professional blue gradient (#1e3a8a to #3b82f6)
- **Typography**: Modern Inter font family
- **Spacing**: Consistent use of MUI spacing system
- **Cards**: Hover effects and smooth transitions
- **Icons**: Material Design icons for visual appeal
- **Grid System**: Responsive grid layout using MUI Grid

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **xs**: 0px (mobile)
- **sm**: 600px (tablet)
- **md**: 900px (laptop)
- **lg**: 1200px (desktop)

## 🖼️ Gallery Features

- Filter by category (Exterior, Lobby, Rooms, Service, Facilities, Amenities, Dining)
- Modal view with full-size images
- Previous/Next navigation in modal
- Smooth transitions and hover effects
- Placeholder images from Unsplash

## 🔧 Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (one-way operation)
npm eject
```

## 🎯 Customization

### Update Hotel Information
Edit the following files to customize:
- `src/components/Header.tsx` - Hotel name, phone, address
- `src/components/HotelInfo.tsx` - Check-in/out times, policies
- `src/components/Footer.tsx` - Contact information and links

### Update Gallery Images
Replace image URLs in `src/components/PhotoGallery.tsx`:
```typescript
{
  id: 1,
  title: 'Your Title',
  category: 'Category',
  image: 'YOUR_IMAGE_URL',
}
```

### Change Color Scheme
Update the color gradient in component sx props:
```typescript
background: 'linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%)'
```

## 🌐 Deployment

To build for production:
```bash
npm run build
```

This creates an optimized production build in the `build/` folder that can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## ✉️ Email Notifications (EmailJS)

The booking form sends a notification email using EmailJS.

- Create an EmailJS account and set up:
  - Service ID
  - Email template (add fields below)
  - Public key
- Add these to `.env.local` in the project root (see `.env.example`):

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_BOOKING_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

Suggested template variables used by the app:
- `subject`
- `check_in`, `check_out`, `nights`
- `room_type`, `guests`, `smoking_preference`
- `first_name`, `last_name`, `guest_email`, `guest_phone`
- `special_requests`
- `base_amount`, `extra_guests_amount`, `subtotal`, `tax`, `total`, `currency`
- `submitted_at`

Security note: card details are intentionally NOT emailed.

## 📄 License

This project is private and proprietary to Executive Inn and Suites Baker.

## 📞 Contact

For questions or support, contact:
- Phone: +1 (225) 771-1123
- Address: 430 Main St, Baker, Louisiana 70714, USA
- Email: info@executivebakerla.com

## 🎓 Technologies Used

- React 19.2 with TypeScript
- MUI Joy UI - Modern React component library
- Material Design Icons
- Emotion CSS-in-JS
- React Scripts with Webpack

---

**Built with ❤️ using modern web technologies**

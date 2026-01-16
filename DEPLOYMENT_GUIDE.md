# Deployment Guide - Executive Inn Website

## 🚀 Deployment Options

Your Executive Inn website can be deployed to various platforms. Here are the recommended options:

## 1. **Netlify** (Recommended - Easiest)

### Option A: Using GitHub
1. Push code to GitHub repository
2. Visit [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Click "Deploy"

### Option B: Direct Deployment
1. Build locally: `npm run build`
2. Drag and drop the `build` folder to Netlify
3. Site is live instantly!

## 2. **Vercel** (Alternative)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Your site will be deployed and live

## 3. **GitHub Pages**

1. Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/repository-name"
```

2. Install gh-pages: `npm install --save-dev gh-pages`

3. Add deployment scripts to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

4. Run: `npm run deploy`

## 4. **Traditional Web Hosting** (cPanel, etc.)

1. Build the project: `npm run build`
2. Upload the contents of the `build` folder via FTP
3. Configure your domain in hosting settings
4. Site is live!

## 5. **AWS S3 + CloudFront**

1. Build: `npm run build`
2. Create S3 bucket
3. Enable static website hosting
4. Upload `build` contents to bucket
5. Set up CloudFront distribution
6. Configure domain via Route 53

## 📋 Pre-Deployment Checklist

- [ ] Replace all placeholder images with real hotel photos
- [ ] Update hotel name, address, and phone number
- [ ] Update check-in/check-out times if different
- [ ] Update amenities list to match your hotel
- [ ] Update room types to match your offerings
- [ ] Configure email for contact form (see below)
- [ ] Test all links and functionality
- [ ] Test on mobile devices
- [ ] Update meta tags for SEO

## 📧 Setting Up Email for Contact Form

### Using Formspree (Free, Easy)

1. Visit [formspree.io](https://formspree.io)
2. Sign up for free account
3. Create new form with your email
4. Get the form endpoint
5. Update `Contact.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: new FormData(form),
    });
    
    if (response.ok) {
      alert('Thank you! Your message has been sent.');
      form.reset();
    }
  } catch (error) {
    alert('Error sending message. Please try again.');
  }
};
```

### Using EmailJS (Alternative)

1. Sign up at [emailjs.com](https://emailjs.com)
2. Install: `npm install @emailjs/browser`
3. Initialize EmailJS in component
4. Configure with your service and template IDs

## 🔍 SEO Optimization

Add meta tags to `public/index.html`:

```html
<meta name="description" content="Executive Inn and Suites Baker - Comfortable, affordable hotel accommodations in Baker, Louisiana. Book your stay today!">
<meta name="keywords" content="hotel, baker louisiana, lodging, accommodation">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta property="og:title" content="Executive Inn and Suites Baker">
<meta property="og:description" content="Your premier hotel in Baker, Louisiana">
<meta property="og:image" content="https://example.com/hotel-image.jpg">
```

## 🌐 Domain Setup

1. Register domain via GoDaddy, Namecheap, etc.
2. Point nameservers to your hosting provider
3. Update DNS records as needed
4. Wait for DNS propagation (24-48 hours)

## 📊 Monitor Performance

### Google Analytics
1. Create Google Analytics account
2. Add tracking ID to `public/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Google Search Console
1. Add your domain
2. Verify ownership
3. Monitor search performance
4. Submit sitemap

## 🔒 Security

- Enable HTTPS (automatic on most platforms)
- Set up SSL certificate
- Keep dependencies updated
- Validate form inputs

## 📱 Performance Tips

1. Optimize images before uploading
2. Use WebP format for images
3. Implement lazy loading for images
4. Minimize CSS/JS files
5. Enable gzip compression

## ✅ Testing Before Deployment

```bash
# Run build locally
npm run build

# Serve production build locally
npm install -g serve
serve -s build
```

Visit `http://localhost:3000` and test all features.

## 🆘 Troubleshooting

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`
- Check Node version: `node --version`

### Deployment Issues
- Check build logs for errors
- Verify environment variables
- Test locally first
- Check hosting provider documentation

## 📞 Support

For deployment help:
- Netlify Support: [support.netlify.com](https://support.netlify.com)
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- React Deployment Docs: [facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

---

**Your website is ready to go live!** Choose your preferred platform and deploy with confidence. 🎉

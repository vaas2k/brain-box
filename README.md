## Brainbox Syndicate Website

### Tech Stack
- Next.js 14 (App Router, Static Export)
- Tailwind CSS
- Fonts: Fraunces, DM Sans, DM Mono (Google Fonts via next/font)

### Setup
```bash
npm install
npm run dev
npm run build
```

### Image Assets Needed
- /public/images/logo.png — Company logo (SVG preferred)
- /public/images/hero/ — 5 hero slideshow images (1920x1080)
- /public/images/about-hero.jpg — About page hero (1920x700)
- /public/images/services-hero.jpg — Services page hero
- /public/images/impact-hero.jpg — Impact page hero
- /public/images/clients-hero.jpg — Clients page hero
- /public/images/team/ — Individual photos (400x500 recommended)
- /public/images/awards/ — Appreciation certificate images
- /public/og-image.jpg — Open Graph image (1200x630)

### Deployment
Static output is generated in /out and can be deployed to Vercel, Netlify, or any static host.

### Form Setup
The contact form in app/contact/page.tsx is UI-only for now. Connect it to a backend service such as Formspree, Resend, or Nodemailer.

## Adding New Portfolio Projects
All projects live in one file: /lib/portfolio-data.ts
1. Open the file
2. Find the array for your project type: currentProjects / baselineAssessments / trainingCapacity / evaluationResearch
3. Copy the last entry in that array
4. Increment the id (e.g. "bl-24" → "bl-25")
5. Fill in your new project's details
6. Save the file — it will appear on the website automatically
No code changes required anywhere else.

# Nawa3em Beauty Website

![App Preview](https://imgix.cosmicjs.com/7eab1ff0-a1d7-11f0-bba7-d56988718db7-photo-1487412947147-5cebf100ffc2-1759660735923.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, bilingual beauty services website built with Next.js 15, showcasing Nawa3em's comprehensive beauty offerings including services, products, doctors, and FAQs. Features full Arabic/English localization with elegant RTL support.

## ✨ Features

- 🌍 **Full Bilingual Support** - Complete Arabic/English localization with proper RTL/LTR layouts
- 🎨 **Dynamic Hero Banners** - Rotating promotional banners with customizable CTAs
- 💅 **Service Catalog** - Browse beauty services by category (Hair, Skin, Laser, etc.)
- 🛍️ **Product Showcase** - E-commerce product listings with pricing and availability
- 👨‍⚕️ **Doctor Profiles** - Professional profiles with specialties and offered services
- ❓ **FAQ Section** - Organized frequently asked questions with collapsible answers
- 📱 **Responsive Design** - Mobile-first approach ensuring perfect display on all devices
- 🚀 **Performance Optimized** - Built with Next.js 15 App Router for optimal loading speeds

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68e23c94260d9dd939d1bce9&clone_repository=68e24d4a260d9dd939d1bda9)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a new CosmicJS Bucket for nawa3em (website only) focused on beauty, covering:
> 
> Services (salons/beauty centers)
> 
> Doctors/Clinics (cosmetic/medical aesthetics)
> 
> Products (beauty shop)
> 
> FAQ and Blog (optional)
> with full AR/EN localization, locale-based routes (/ar, /en), and organized media.
> 
> 1) Bucket Setup
> 
> Name: {{BUCKET_NAME}} (e.g., nawa3em-beauty-site)
> 
> Slug: {{BUCKET_SLUG}}
> 
> Generate Read Key and Write Key (print both; keep Write server-side only).
> 
> Media folders:
> 
> /media/services, /media/doctors, /media/products, /media/banners, /media/blog
> 
> 2) Localization & Routes
> 
> Locales: ar, en.
> 
> Add locale field (enum: ar | en) to all translatable types.
> 
> URL scheme: /{locale}/{type}/{slug} (e.g., /ar/services/laser-hair-removal ↔ /en/services/laser-hair-removal).
> 
> Separate navigation object per locale.
> 
> 3) Object Types & Fields
> 
> A) navigation (singleton per locale)
> 
> title (text)
> 
> items (repeatable object): label (text, translatable), path (text, regex ^/(ar|en)/[a-z0-9-/_]*$), order (number), visible (boolean)
> 
> locale (ar|en)
> 
> B) page (generic pages: Home/About/Contact)
> 
> title (text, translatable), slug (slug, unique per locale)
> 
> seo_title (text, translatable), seo_description (text, translatable, ≤160)
> 
> hero_image (media), body (richtext/blocks, translatable)
> 
> locale (ar|en)
> 
> C) service (salon/center services)
> 
> name (text, translatable), slug (slug, unique per locale)
> 
> category (select: Hair, Nails, Skin, Makeup, Laser, LashesBrows, Spa)
> 
> summary (text, translatable), price_from (number), duration_min (number)
> 
> gallery (media multiple), is_active (boolean)
> 
> locale (ar|en)
> 
> D) doctor (cosmetic doctors/clinics)
> 
> full_name (text, translatable), slug (slug, unique per locale)
> 
> specialty (select: Dermatology, PlasticSurgery, Laser, Aesthetics)
> 
> experience_years (number), certifications (text, translatable)
> 
> services (relation → service[], many)
> 
> photo (media), clinic_location (object: city, address, map_url)
> 
> is_active (boolean), locale (ar|en)
> 
> E) product (beauty shop)
> 
> name (text, translatable), slug (slug, unique per locale)
> 
> category (select: SkinCare, HairCare, Makeup, FragranceBody, Devices, Supplements)
> 
> short_desc (text, translatable), price (number), currency (select: USD, EUR, GBP, SAR — default {{CURRENCY}})
> 
> images (media multiple), rating (0–5), in_stock (boolean)
> 
> locale (ar|en)
> 
> F) faq
> 
> question (text, translatable), answer (richtext, translatable), order (number), locale (ar|en)
> 
> G) post (blog — optional)
> 
> title (text, translatable), slug (slug, unique per locale)
> 
> cover (media), excerpt (text, translatable), content (richtext/blocks, translatable)
> 
> tags (text[], translatable), published_at (date), locale (ar|en)
> 
> H) banner (hero/slider promos)
> 
> title (text, translatable), image (media)
> 
> cta_label (text, translatable), cta_path (text, regex ^/(ar|en)/[a-z0-9-/_]*$)
> 
> order (number), active (boolean), locale (ar|en)
> 
> Use metadata for any extra fields as needed.
> 
> 4) Seed Content
> 
> Create at least:
> 
> 6 services per locale (3 Hair / 2 Skin / 1 Laser)
> 
> 4 products per locale
> 
> 2 doctors per locale
> 
> 6 FAQ items per locale
> 
> 2 active banners per locale
> 
> Link doctor.services to relevant service items.
> 
> 5) Webhooks (optional)
> 
> Add Deploy-Hook on object.published & object.edited → POST to {{BUILD_HOOK_URL}} (CI/CD).
> 
> Print the last webhook response (status/body).
> 
> 6) Fetch Examples (print working samples)
> 
> REST
> 
> Services (ar):
> GET https://api.cosmicjs.com/v3/buckets/{{BUCKET_SLUG}}/objects?type=service&locale=ar&status=published
> 
> Single product (en) by slug:
> GET https://api.cosmicjs.com/v3/buckets/{{BUCKET_SLUG}}/objects/{{PRODUCT_SLUG}}?locale=en
> 
> GraphQL
> 
> query Services($locale: String!) {
>   objects(input:{ type:"service", status:"published", locale:$locale, limit:10 }) {
>     edges {
>       node { id title slug metadata { category price_from duration_min } }
>     }
>   }
> }
> 
> 7) Required Output
> 
> Bucket slug / Read Key / Write Key.
> 
> Object Types & fields summary (JSON-like).
> 
> Webhook URLs (if any) + last response.
> 
> Generated REST/GraphQL endpoints + sample responses.
> 
> Quick guide CMS_SETUP.md (how to manage nav, translations, and add service/doctor/product).
> 
> Acceptance
> 
> Content available in ar/en with correct localized paths.
> 
> Separate navigation per locale with valid links.
> 
> Services/products/doctors interlinked as specified.
> 
> REST/GraphQL examples return valid data (200/JSON)."

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Runtime**: Bun
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Bun installed on your machine
- Cosmic account with your nawa3em-production bucket

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nawa3em-beauty-website
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file in the root directory:
```env
COSMIC_BUCKET_SLUG=nawa3em-production
COSMIC_READ_KEY=your_read_key_here
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Cosmic SDK Examples

### Fetching Services by Locale

```typescript
import { cosmic } from '@/lib/cosmic'

async function getServices(locale: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'services',
        'metadata.locale.key': locale
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Service[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching Products with Filtering

```typescript
async function getProducts(locale: string, category?: string) {
  try {
    const query: Record<string, any> = {
      type: 'products',
      'metadata.locale.key': locale
    }
    
    if (category) {
      query['metadata.category.key'] = category
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Product[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching Single Doctor with Services

```typescript
async function getDoctor(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'doctors',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1) // This loads related services automatically
    
    return response.object as Doctor
  } catch (error) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}
```

## 🌐 Cosmic CMS Integration

This application is fully integrated with your Cosmic bucket structure:

- **Services**: Displays all beauty services with category filtering
- **Products**: Product catalog with pricing and availability
- **Doctors**: Professional profiles with linked services
- **Banners**: Dynamic hero sections with locale-specific content
- **FAQ**: Organized support content with collapsible answers

All content is managed through the Cosmic dashboard at [https://app.cosmicjs.com](https://app.cosmicjs.com).

## 🚀 Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy!

## 📝 License

MIT License - feel free to use this project for your own purposes.

<!-- README_END -->
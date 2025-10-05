// app/[locale]/page.tsx
import { getBanners, getServices, getProducts, getDoctors } from '@/lib/cosmic'
import HeroBanner from '@/components/HeroBanner'
import ServiceCard from '@/components/ServiceCard'
import ProductCard from '@/components/ProductCard'
import DoctorCard from '@/components/DoctorCard'
import Link from 'next/link'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  
  const [banners, services, products, doctors] = await Promise.all([
    getBanners(locale),
    getServices(locale),
    getProducts(locale),
    getDoctors(locale),
  ])
  
  const texts = {
    en: {
      services: 'Our Services',
      viewAll: 'View All Services',
      products: 'Featured Products',
      viewAllProducts: 'View All Products',
      doctors: 'Our Specialists',
      viewAllDoctors: 'Meet All Doctors',
    },
    ar: {
      services: 'خدماتنا',
      viewAll: 'عرض جميع الخدمات',
      products: 'المنتجات المميزة',
      viewAllProducts: 'عرض جميع المنتجات',
      doctors: 'أخصائيونا',
      viewAllDoctors: 'تعرف على جميع الأطباء',
    },
  }
  
  const t = texts[locale as 'en' | 'ar'] || texts.en
  
  return (
    <div>
      {/* Hero Banners */}
      {banners && banners.length > 0 && (
        <div className="mb-16">
          <HeroBanner banners={banners} locale={locale} />
        </div>
      )}
      
      {/* Services Section */}
      {services && services.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t.services}</h2>
            <Link
              href={`/${locale}/services`}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              {t.viewAll} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} locale={locale} />
            ))}
          </div>
        </section>
      )}
      
      {/* Products Section */}
      {products && products.length > 0 && (
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{t.products}</h2>
              <Link
                href={`/${locale}/products`}
                className="text-primary hover:text-primary-dark transition-colors"
              >
                {t.viewAllProducts} →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Doctors Section */}
      {doctors && doctors.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t.doctors}</h2>
            <Link
              href={`/${locale}/doctors`}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              {t.viewAllDoctors} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.slice(0, 3).map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
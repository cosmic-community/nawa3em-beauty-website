// app/[locale]/services/page.tsx
import { getServices } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'

interface ServicesPageProps {
  params: Promise<{ locale: string }>
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params
  const services = await getServices(locale)
  
  const texts = {
    en: {
      title: 'Our Services',
      description: 'Explore our comprehensive range of beauty services',
      noServices: 'No services available at the moment.',
    },
    ar: {
      title: 'خدماتنا',
      description: 'استكشف مجموعتنا الشاملة من خدمات التجميل',
      noServices: 'لا توجد خدمات متاحة في الوقت الحالي.',
    },
  }
  
  const t = texts[locale as 'en' | 'ar'] || texts.en
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
        <p className="text-lg text-gray-600">{t.description}</p>
      </div>
      
      {services && services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">{t.noServices}</p>
        </div>
      )}
    </div>
  )
}
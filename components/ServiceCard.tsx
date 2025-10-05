import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service
  locale: string
}

export default function ServiceCard({ service, locale }: ServiceCardProps) {
  const firstImage = service.metadata.gallery?.[0]
  
  const texts = {
    en: {
      from: 'From',
      minutes: 'min',
    },
    ar: {
      from: 'من',
      minutes: 'دقيقة',
    },
  }
  
  const t = texts[locale as 'en' | 'ar'] || texts.en
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {firstImage && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={`${firstImage.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={service.metadata.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="text-sm text-primary font-semibold mb-2">
          {service.metadata.category.value}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {service.metadata.name}
        </h3>
        
        {service.metadata.summary && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {service.metadata.summary}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          {service.metadata.price_from && (
            <span className="font-semibold text-primary">
              {t.from} ${service.metadata.price_from}
            </span>
          )}
          
          {service.metadata.duration_min && (
            <span>
              {service.metadata.duration_min} {t.minutes}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
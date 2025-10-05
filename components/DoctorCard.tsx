import type { Doctor } from '@/types'

interface DoctorCardProps {
  doctor: Doctor
  locale: string
}

export default function DoctorCard({ doctor, locale }: DoctorCardProps) {
  const texts = {
    en: {
      experience: 'years experience',
      services: 'Services offered',
    },
    ar: {
      experience: 'سنوات من الخبرة',
      services: 'الخدمات المقدمة',
    },
  }
  
  const t = texts[locale as 'en' | 'ar'] || texts.en
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {doctor.metadata.photo && (
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={`${doctor.metadata.photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={doctor.metadata.full_name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {doctor.metadata.full_name}
        </h3>
        
        <div className="text-primary font-semibold mb-3">
          {doctor.metadata.specialty.value}
        </div>
        
        {doctor.metadata.experience_years && (
          <p className="text-sm text-gray-600 mb-3">
            {doctor.metadata.experience_years} {t.experience}
          </p>
        )}
        
        {doctor.metadata.services && doctor.metadata.services.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">{t.services}:</p>
            <div className="flex flex-wrap gap-2">
              {doctor.metadata.services.slice(0, 3).map((service) => (
                <span
                  key={service.id}
                  className="px-3 py-1 bg-secondary rounded-full text-xs text-gray-700"
                >
                  {service.title}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {doctor.metadata.clinic_location && (
          <div className="mt-4 text-sm text-gray-500">
            📍 {doctor.metadata.clinic_location.city}
          </div>
        )}
      </div>
    </div>
  )
}
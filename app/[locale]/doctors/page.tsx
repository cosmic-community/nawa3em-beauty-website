// app/[locale]/doctors/page.tsx
import { getDoctors } from '@/lib/cosmic'
import DoctorCard from '@/components/DoctorCard'

interface DoctorsPageProps {
  params: Promise<{ locale: string }>
}

export default async function DoctorsPage({ params }: DoctorsPageProps) {
  const { locale } = await params
  const doctors = await getDoctors(locale)
  
  const texts = {
    en: {
      title: 'Our Specialists',
      description: 'Meet our team of experienced beauty and cosmetic specialists',
      noDoctors: 'No specialists available at the moment.',
    },
    ar: {
      title: 'أخصائيونا',
      description: 'تعرف على فريقنا من أخصائيي التجميل والجراحة التجميلية ذوي الخبرة',
      noDoctors: 'لا يوجد أخصائيون متاحون في الوقت الحالي.',
    },
  }
  
  const t = texts[locale as 'en' | 'ar'] || texts.en
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
        <p className="text-lg text-gray-600">{t.description}</p>
      </div>
      
      {doctors && doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">{t.noDoctors}</p>
        </div>
      )}
    </div>
  )
}
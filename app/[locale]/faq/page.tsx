// app/[locale]/faq/page.tsx
import { getFAQs } from '@/lib/cosmic'
import FAQItem from '@/components/FAQItem'

interface FAQPageProps {
  params: Promise<{ locale: string }>
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params
  const faqs = await getFAQs(locale)
  
  const texts = {
    en: {
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about our services and products',
      noFAQs: 'No FAQs available at the moment.',
    },
    ar: {
      title: 'الأسئلة الشائعة',
      description: 'اعثر على إجابات للأسئلة الشائعة حول خدماتنا ومنتجاتنا',
      noFAQs: 'لا توجد أسئلة شائعة متاحة في الوقت الحالي.',
    },
  }
  
  const t = texts[locale as 'en' | 'ar'] || texts.en
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
        <p className="text-lg text-gray-600">{t.description}</p>
      </div>
      
      {faqs && faqs.length > 0 ? (
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">{t.noFAQs}</p>
        </div>
      )}
    </div>
  )
}
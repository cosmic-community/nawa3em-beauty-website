import Link from 'next/link'

interface HeaderProps {
  locale: string
}

export default function Header({ locale }: HeaderProps) {
  const isArabic = locale === 'ar'
  
  const texts = {
    en: {
      brand: 'Nawa3em Beauty',
      services: 'Services',
      products: 'Products',
      doctors: 'Specialists',
      faq: 'FAQ',
      switchLang: 'العربية',
    },
    ar: {
      brand: 'نواعم للجمال',
      services: 'الخدمات',
      products: 'المنتجات',
      doctors: 'الأخصائيون',
      faq: 'الأسئلة الشائعة',
      switchLang: 'English',
    },
  }
  
  const t = texts[locale as 'en' | 'ar'] || texts.en
  const otherLocale = locale === 'en' ? 'ar' : 'en'
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="text-2xl font-bold text-primary">
            {t.brand}
          </Link>
          
          <div className="flex items-center gap-8">
            <Link href={`/${locale}/services`} className="text-gray-700 hover:text-primary transition-colors">
              {t.services}
            </Link>
            <Link href={`/${locale}/products`} className="text-gray-700 hover:text-primary transition-colors">
              {t.products}
            </Link>
            <Link href={`/${locale}/doctors`} className="text-gray-700 hover:text-primary transition-colors">
              {t.doctors}
            </Link>
            <Link href={`/${locale}/faq`} className="text-gray-700 hover:text-primary transition-colors">
              {t.faq}
            </Link>
            
            <Link
              href={`/${otherLocale}`}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              {t.switchLang}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
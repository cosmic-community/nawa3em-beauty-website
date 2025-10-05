interface FooterProps {
  locale: string
}

export default function Footer({ locale }: FooterProps) {
  const texts = {
    en: {
      brand: 'Nawa3em Beauty',
      description: 'Your premium destination for beauty services and products',
      rights: 'All rights reserved.',
    },
    ar: {
      brand: 'نواعم للجمال',
      description: 'وجهتك الفاخرة لخدمات ومنتجات التجميل',
      rights: 'جميع الحقوق محفوظة.',
    },
  }
  
  const t = texts[locale as 'en' | 'ar'] || texts.en
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">{t.brand}</h3>
          <p className="text-gray-400 mb-6">{t.description}</p>
          <p className="text-gray-500 text-sm">
            © {currentYear} {t.brand}. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
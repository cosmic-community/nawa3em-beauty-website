// app/[locale]/layout.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <Header locale={locale} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  )
}
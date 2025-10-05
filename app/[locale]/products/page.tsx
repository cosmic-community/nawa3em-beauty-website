// app/[locale]/products/page.tsx
import { getProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

interface ProductsPageProps {
  params: Promise<{ locale: string }>
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params
  const products = await getProducts(locale)
  
  const texts = {
    en: {
      title: 'Our Products',
      description: 'Discover our curated selection of premium beauty products',
      noProducts: 'No products available at the moment.',
    },
    ar: {
      title: 'منتجاتنا',
      description: 'اكتشف مجموعتنا المختارة من منتجات التجميل الفاخرة',
      noProducts: 'لا توجد منتجات متاحة في الوقت الحالي.',
    },
  }
  
  const t = texts[locale as 'en' | 'ar'] || texts.en
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
        <p className="text-lg text-gray-600">{t.description}</p>
      </div>
      
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">{t.noProducts}</p>
        </div>
      )}
    </div>
  )
}
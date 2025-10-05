import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  locale: string
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const firstImage = product.metadata.images?.[0]
  
  const texts = {
    en: {
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
    },
    ar: {
      inStock: 'متوفر',
      outOfStock: 'غير متوفر',
    },
  }
  
  const t = texts[locale as 'en' | 'ar'] || texts.en
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {firstImage && (
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={`${firstImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={product.metadata.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="text-xs text-primary font-semibold mb-1">
          {product.metadata.category.value}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {product.metadata.name}
        </h3>
        
        {product.metadata.short_desc && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.metadata.short_desc}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            {product.metadata.currency.value} {product.metadata.price}
          </span>
          
          {product.metadata.rating && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-600">{product.metadata.rating}</span>
            </div>
          )}
        </div>
        
        <div className={`mt-2 text-xs font-semibold ${
          product.metadata.in_stock ? 'text-green-600' : 'text-red-600'
        }`}>
          {product.metadata.in_stock ? t.inStock : t.outOfStock}
        </div>
      </div>
    </div>
  )
}
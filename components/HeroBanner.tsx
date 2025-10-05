'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Banner } from '@/types'

interface HeroBannerProps {
  banners: Banner[]
  locale: string
}

export default function HeroBanner({ banners, locale }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (banners.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [banners.length])
  
  if (!banners || banners.length === 0) {
    return null
  }
  
  const currentBanner = banners[currentIndex]
  
  if (!currentBanner) {
    return null
  }
  
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <img
        src={`${currentBanner.metadata.image.imgix_url}?w=1920&h=1000&fit=crop&auto=format,compress`}
        alt={currentBanner.metadata.banner_title}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {currentBanner.metadata.banner_title}
          </h1>
          
          {currentBanner.metadata.cta_label && currentBanner.metadata.cta_path && (
            <Link
              href={currentBanner.metadata.cta_path}
              className="inline-block px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-lg font-semibold"
            >
              {currentBanner.metadata.cta_label}
            </Link>
          )}
        </div>
      </div>
      
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
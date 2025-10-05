// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Locale type
export interface Locale {
  key: 'ar' | 'en'
  value: 'Arabic' | 'English'
}

// Banner type
export interface Banner extends CosmicObject {
  type: 'banners'
  metadata: {
    banner_title: string
    image: {
      url: string
      imgix_url: string
    }
    cta_label?: string
    cta_path?: string
    order?: number
    active: boolean
    locale: Locale
  }
}

// Service category type
export type ServiceCategory = 'hair' | 'nails' | 'skin' | 'makeup' | 'laser' | 'lashes_brows' | 'spa'

// Service type
export interface Service extends CosmicObject {
  type: 'services'
  metadata: {
    name: string
    category: {
      key: ServiceCategory
      value: string
    }
    summary?: string
    price_from?: number
    duration_min?: number
    gallery?: Array<{
      url: string
      imgix_url: string
    }>
    is_active: boolean
    locale: Locale
  }
}

// Product category type
export type ProductCategory = 'skin_care' | 'hair_care' | 'makeup' | 'fragrance_body' | 'devices' | 'supplements'

// Product type
export interface Product extends CosmicObject {
  type: 'products'
  metadata: {
    name: string
    category: {
      key: ProductCategory
      value: string
    }
    short_desc?: string
    price: number
    currency: {
      key: 'usd' | 'eur' | 'gbp' | 'sar'
      value: string
    }
    images?: Array<{
      url: string
      imgix_url: string
    }>
    rating?: number
    in_stock: boolean
    locale: Locale
  }
}

// Doctor specialty type
export type DoctorSpecialty = 'dermatology' | 'plastic_surgery' | 'laser' | 'aesthetics'

// Doctor type
export interface Doctor extends CosmicObject {
  type: 'doctors'
  metadata: {
    full_name: string
    specialty: {
      key: DoctorSpecialty
      value: string
    }
    experience_years?: number
    certifications?: string
    services?: Service[]
    photo?: {
      url: string
      imgix_url: string
    }
    clinic_location?: {
      city: string
      address: string
      map_url: string
    }
    is_active: boolean
    locale: Locale
  }
}

// FAQ type
export interface FAQ extends CosmicObject {
  type: 'faq'
  metadata: {
    question: string
    answer: string
    order?: number
    locale: Locale
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
  skip?: number
}
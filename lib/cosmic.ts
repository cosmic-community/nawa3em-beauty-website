import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Helper functions for fetching data
import type { Banner, Service, Product, Doctor, FAQ, ServiceCategory, ProductCategory } from '@/types'

export async function getBanners(locale: string): Promise<Banner[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'banners',
        'metadata.locale.key': locale,
        'metadata.active': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const banners = response.objects as Banner[]
    
    // Sort by order (lower numbers first)
    return banners.sort((a, b) => {
      const orderA = a.metadata?.order || 999
      const orderB = b.metadata?.order || 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch banners')
  }
}

export async function getServices(locale: string, category?: ServiceCategory): Promise<Service[]> {
  try {
    const query: Record<string, any> = {
      type: 'services',
      'metadata.locale.key': locale,
      'metadata.is_active': true
    }
    
    if (category) {
      query['metadata.category.key'] = category
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Service[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch services')
  }
}

export async function getService(slug: string): Promise<Service | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'services',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Service
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch service')
  }
}

export async function getProducts(locale: string, category?: ProductCategory): Promise<Product[]> {
  try {
    const query: Record<string, any> = {
      type: 'products',
      'metadata.locale.key': locale,
      'metadata.in_stock': true
    }
    
    if (category) {
      query['metadata.category.key'] = category
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch products')
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'products',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Product
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch product')
  }
}

export async function getDoctors(locale: string): Promise<Doctor[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'doctors',
        'metadata.locale.key': locale,
        'metadata.is_active': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Doctor[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch doctors')
  }
}

export async function getDoctor(slug: string): Promise<Doctor | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'doctors',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Doctor
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch doctor')
  }
}

export async function getFAQs(locale: string): Promise<FAQ[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'faq',
        'metadata.locale.key': locale
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const faqs = response.objects as FAQ[]
    
    // Sort by order (lower numbers first)
    return faqs.sort((a, b) => {
      const orderA = a.metadata?.order || 999
      const orderB = b.metadata?.order || 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch FAQs')
  }
}
'use client'

import { useState } from 'react'
import type { FAQ } from '@/types'

interface FAQItemProps {
  faq: FAQ
}

export default function FAQItem({ faq }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-4">
          {faq.metadata.question}
        </h3>
        <span className={`text-2xl text-primary transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`}>
          ↓
        </span>
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 border-t border-gray-100">
          <div
            className="prose max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: faq.metadata.answer }}
          />
        </div>
      )}
    </div>
  )
}
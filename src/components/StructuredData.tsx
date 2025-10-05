import { useLocale } from 'next-intl'

interface StructuredDataProps {
  type?: 'website' | 'tool' | 'article'
  title?: string
  description?: string
  url?: string
  articleData?: {
    headline: string
    datePublished: string
    dateModified: string
    author: string
    publisher: string
  }
}

export default function StructuredData({ 
  type = 'website', 
  title, 
  description, 
  url,
  articleData 
}: StructuredDataProps) {
  const locale = useLocale()
  const baseUrl = 'https://address-generator.xyz'
  
  const getWebsiteStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": title || "地址生成器 - 免费的虚拟地址生成工具",
    "description": description || "免费的地址生成器，支持生成美国、加拿大、英国、新加坡、台湾、香港等地区的虚拟地址",
    "url": url || `${baseUrl}/${locale}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/${locale}?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Address Generator",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "inLanguage": locale,
    "copyrightYear": "2025",
    "genre": ["工具", "地址生成", "虚拟地址", "测试工具"]
  })
  
  const getToolStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title || "地址生成器",
    "description": description || "免费的虚拟地址生成工具",
    "url": url || `${baseUrl}/${locale}`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Address Generator",
      "url": baseUrl
    },
    "featureList": [
      "美国地址生成",
      "加拿大地址生成", 
      "英国地址生成",
      "新加坡地址生成",
      "台湾地址生成",
      "香港地址生成",
      "地址搜索功能",
      "地址保存功能"
    ],
    "screenshot": `${baseUrl}/screenshot.png`,
    "inLanguage": locale
  })
  
  const getArticleStructuredData = () => {
    if (!articleData) return null
    
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": articleData.headline,
      "description": description,
      "url": url,
      "datePublished": articleData.datePublished,
      "dateModified": articleData.dateModified,
      "author": {
        "@type": "Person",
        "name": articleData.author
      },
      "publisher": {
        "@type": "Organization",
        "name": articleData.publisher,
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "inLanguage": locale,
      "articleSection": "地址生成工具教程"
    }
  }
  
  const getBreadcrumbStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": `${baseUrl}/${locale}`
      }
    ]
  })
  
  let structuredData
  switch (type) {
    case 'tool':
      structuredData = getToolStructuredData()
      break
    case 'article':
      structuredData = getArticleStructuredData()
      break
    default:
      structuredData = getWebsiteStructuredData()
  }
  
  if (!structuredData) return null
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbStructuredData())
        }}
      />
    </>
  )
}
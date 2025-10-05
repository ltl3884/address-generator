import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://address-generator.xyz'
  
  // 基础页面
  const staticPages = [
    '',
    '/us',
    '/ca', 
    '/uk',
    '/sg',
    '/tw',
    '/hk',
    '/my_address'
  ]
  
  // 美国州页面
  const usStates = [
    'california', 'texas', 'florida', 'new-york', 'pennsylvania',
    'illinois', 'ohio', 'georgia', 'north-carolina', 'michigan',
    'new-jersey', 'virginia', 'washington', 'arizona', 'massachusetts',
    'tennessee', 'indiana', 'missouri', 'maryland', 'wisconsin',
    'colorado', 'minnesota', 'south-carolina', 'alabama', 'louisiana',
    'kentucky', 'oregon', 'oklahoma', 'connecticut', 'utah',
    'iowa', 'nevada', 'arkansas', 'mississippi', 'kansas',
    'new-mexico', 'nebraska', 'west-virginia', 'idaho', 'hawaii',
    'new-hampshire', 'maine', 'montana', 'rhode-island', 'delaware',
    'south-dakota', 'north-dakota', 'alaska', 'vermont', 'wyoming'
  ]
  
  // 博客文章
  const articles = [
    'us-tax-free-states',
    'us-address-structure', 
    'why-delaware-best-tax-free',
    'hong-kong-address-structure'
  ]
  
  const sitemap: MetadataRoute.Sitemap = []
  
  // 为每种语言生成页面
  routing.locales.forEach(locale => {
    // 静态页面
    staticPages.forEach(page => {
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map(lang => [
              lang,
              `${baseUrl}/${lang}${page}`
            ])
          )
        }
      })
    })
    
    // 美国州页面
    usStates.forEach(state => {
      sitemap.push({
        url: `${baseUrl}/${locale}/us/${state}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map(lang => [
              lang,
              `${baseUrl}/${lang}/us/${state}`
            ])
          )
        }
      })
    })
    
    // 博客文章
    articles.forEach(article => {
      sitemap.push({
        url: `${baseUrl}/${locale}/article/${article}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map(lang => [
              lang,
              `${baseUrl}/${lang}/article/${article}`
            ])
          )
        }
      })
    })
  })
  
  return sitemap
}
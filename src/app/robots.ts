import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://address-generator.xyz' 
    : 'http://localhost:3000'

  return {
    rules: [
      // 主要搜索引擎优化规则
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '*.json',
          '/private/',
          '/temp/',
        ],
        crawlDelay: 1, // 为Google设置较短的爬取延迟
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '*.json',
          '/private/',
          '/temp/',
        ],
        crawlDelay: 2, // 为Bing设置适中的爬取延迟
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '*.json',
          '/private/',
          '/temp/',
        ],
        crawlDelay: 3, // 为百度设置较长的爬取延迟
      },
      // 通用搜索引擎规则
      {
        userAgent: '*',
        allow: [
          '/',
          '/zh/',
          '/en/',
          '/zh/my_address/',
          '/en/my_address/',
          '/*.css',
          '/*.js',
          '/favicon.ico',
          '/sitemap.xml',
          '/robots.txt',
        ],
        disallow: [
          '/api/',
          '/_next/static/chunks/', // 允许CSS/JS但禁止chunks
          '/admin/',
          '*.json',
          '/private/',
          '/temp/',
          '/*?*', // 禁止带查询参数的URL（避免重复内容）
          '/*#*', // 禁止带锚点的URL
        ],
        crawlDelay: 5, // 为其他爬虫设置较长延迟
      },
      // 社交媒体爬虫（允许访问以便分享）
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // AI爬虫限制（保护内容版权）
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        disallow: '/',
      },
      {
        userAgent: 'YouBot',
        disallow: '/',
      },
      // 其他AI训练爬虫
      {
        userAgent: 'AI2Bot',
        disallow: '/',
      },
      {
        userAgent: 'iaskspider',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
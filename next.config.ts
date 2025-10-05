import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // 启用独立输出模式以支持 Docker 部署
  output: 'standalone',
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },

  // 禁用开发模式下的所有指示器
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 压缩配置
  compress: true,
  
  // 性能优化
  poweredByHeader: false,
  
  // 安全头部
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },

  // 确保多语言路由在生产环境中正常工作
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/zh',
      },
    ];
  },
};

export default withNextIntl(nextConfig);

import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // 启用独立输出模式以支持 Docker 部署
  output: 'standalone',
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  experimental: {
    optimizePackageImports: [],
  },

  // 禁用开发模式下的所有指示器
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
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

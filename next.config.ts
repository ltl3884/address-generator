import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 移除 output 配置，使用默认模式支持 API 路由和直接部署
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
};

export default nextConfig;

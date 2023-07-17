/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['raw.githubusercontent.com'],
      loader: 'default',
      path: '/_next/image',
      disableStaticImages: true,
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      domains: ['raw.githubusercontent.com'],
      minimumCacheTTL: 60,
      remotePattern: 'https://raw.githubusercontent.com/*'
    }
  }
  
  module.exports = nextConfig;
  

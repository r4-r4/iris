/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
    turbo: {
      rules: {
        '*.css': {
          loaders: ['@tailwindcss/postcss'],
        },
      },
    },
  },
}

export default nextConfig

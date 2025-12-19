/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
}

export default nextConfig

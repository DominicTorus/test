/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/ct003/cg/tg3/v4',
  reactStrictMode: false,
  output: 'standalone',  // Add this line to enable standalone builds,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
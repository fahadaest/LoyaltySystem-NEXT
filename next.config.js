/** @type {import('next').NextConfig} */

const nextConfig = {

  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    unoptimized: true,
  },

  output: 'export',
  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  generateStaticParams: async () => {
    return [];
  }
};

module.exports = nextConfig;
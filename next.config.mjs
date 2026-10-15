/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75, 78],
  },
  async headers() {
    // Only send HSTS / upgrade rules in production. They break local http://localhost
    if (process.env.NODE_ENV !== 'production') {
      return []
    }

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: 'upgrade-insecure-requests',
          },
        ],
      },
    ]
  },
}

export default nextConfig

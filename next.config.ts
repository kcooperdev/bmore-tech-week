import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/events", destination: "/schedule", permanent: true },
      { source: "/speakers", destination: "/speak", permanent: true },
      { source: "/apply/speak", destination: "/speak", permanent: true },
      { source: "/apply/partner", destination: "/get-involved", permanent: false },
      { source: "/apply/sponsor", destination: "/sponsors", permanent: true },
      { source: "/apply/ambassador", destination: "/get-involved", permanent: false },
      { source: "/ambassador", destination: "/get-involved", permanent: false },
      { source: "/ambassadors", destination: "/get-involved", permanent: false },
      { source: "/the-week", destination: "/about", permanent: true },
      { source: "/volunteer", destination: "/get-involved", permanent: true },
      { source: "/expo", destination: "/get-involved", permanent: false },
      { source: "/partners", destination: "/get-involved", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

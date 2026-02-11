/** @type {import('next').NextConfig} */

// Content Security Policy configuration
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https: https://cal.com;
  media-src 'self' https:;
  object-src 'none';
  frame-src 'self' https://cal.com;
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\n/g, '')

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
  },
  async headers() {
    return [
      {
        source: '/:path*',
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
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy,
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(self "https://cal.com"), microphone=(self "https://cal.com"), camera=(self "https://cal.com"), payment=()',
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/lilith-zero/install.sh',
        destination: 'https://raw.githubusercontent.com/BadC-mpany/lilith-zero/main/install.sh',
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig


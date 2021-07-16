const withPlugins = require('next-compose-plugins');
const withSitemap = require('next-with-sitemap');
const { createSecureHeaders } = require('next-secure-headers');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPreact = require('next-plugin-preact');


const nextConfig = {
  sitemap: {
    baseUrl: `https://${process.env.NEXT_PUBLIC_SM_URL}` || 'https://shop.car.com',
    excludedPaths: [
      '/404/',
      '/[campaign]/[make]/',
      '/[campaign]/[make]/[model]',
      '/[campaign]/fas/',
      '/[campaign]/fas/[make]/[model]/[zipcode]',
      '/[campaign]/fas/[make]/[model]/',
      '/[campaign]/fas/[make]/',
      '/[campaign]/s2/[make]/[model]/[zipcode]',
      '/[campaign]/s2/[make]/[model]/',
      '/[campaign]/s2/[make]/',
      '/[campaign]/s2/',
      '/[campaign]/thankyou/',
    ],
    robots: true,
  },
  async headers() {
    return [
      { source: '/(.*)', headers: createSecureHeaders() },
      {
        source: '/:path*',
        headers: [
          {
            key: 'cache-control',
            value: 'no-store',
          },
        ],
      },
      {
        source: '/',
        headers: [
          {
            key: 'cache-control',
            value: 'public, s-maxage=31536000, max-age=3600',
          },
        ],
      },
      {
        source: '/:campaign([a-z-]{1,})/:make([a-z-]{1,})',
        headers: [
          {
            key: 'cache-control',
            value: 'public, s-maxage=31536000, max-age=3600',
          },
        ],
      },
      {
        source: '/:campaign([a-z-]{1,})/:make([a-z-]{1,})/:model([a-z-]{1,})',
        headers: [
          {
            key: 'cache-control',
            value: 'public, s-maxage=31536000, max-age=3600',
          },
        ],
      },
    ];
  },
}

module.exports = withPlugins([
  [withPreact],
  [withBundleAnalyzer],
  [withSitemap]
], nextConfig);
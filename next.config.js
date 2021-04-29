const withSitemap = require('next-with-sitemap');
const { createSecureHeaders } = require('next-secure-headers');
const withPWA = require('next-pwa');
const withPreact = require('next-plugin-preact');

const enablePWAConfig = process.env.USE_PWA_CONFIG === 'true';
const shouldEnableCDN = process.env.NODE_ENV === 'production';

const envPrefix = () => (shouldEnableCDN ? `.${process.env.DEPLOY_ENV_PREFIX}` : '');

const baseNextConfig = {
  sitemap: {
    baseUrl: process.env.SM_URL || 'https://shop.car.com',
    excludedPaths: [
      '/404/',
      '/[make]/',
      '/[make]/[model]',
      '/fas/',
      '/fas/[make]/[model]/[zipcode]',
      '/fas/[make]/[model]/',
      '/fas/[make]/',
      '/s2/[make]/[model]/[zipcode]',
      '/s2/[make]/[model]/',
      '/s2/[make]/',
      '/s2/',
      '/thankyou/',
    ],
    robots: true,
  },
  images: {
    deviceSizes: [320, 768, 1024],
  },
  async headers() {
    return [
      { source: '/(.*)', headers: createSecureHeaders() },
      {
        source: '/:path*',
        headers: [
          {
            key: 'cache-control',
            value: 'public, s-maxage=31536000, max-age=31536000',
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
        source: '/:make([a-z-]{1,})',
        headers: [
          {
            key: 'cache-control',
            value: 'public, s-maxage=31536000, max-age=3600',
          },
        ],
      },
      {
        source: '/:make([a-z-]{1,})/:model([a-z-]{1,})',
        headers: [
          {
            key: 'cache-control',
            value: 'public, s-maxage=31536000, max-age=3600',
          },
        ],
      },
    ];
  },
  experimental: {
    optimizeCss: true,
  },
  assetPrefix: shouldEnableCDN ? `https://shop${envPrefix()}.car.com` : '',
};
const pwaConfig = {
  pwa: {
    dest: 'public',
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts',
          expiration: {
            maxEntries: 4,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
          },
        },
      },
      {
        urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-font-assets',
          expiration: {
            maxEntries: 4,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          },
        },
      },
      {
        urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-image-assets',
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: /^\/_next\/image\?url=.+$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'next-image',
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: /\.(?:mp3|mp4)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-media-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: /\.(?:js)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-js-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: /\.(?:css|less)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-style-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: /\.(?:json|xml|csv)$/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'static-data-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        /* Exclude /api/auth/callback/* to fix OAuth workflow in Safari without impact
        other environment
        Above route is default for next-auth, you may need to change it if your OAuth
        workflow has a different callback route
        Issue: https://github.com/shadowwalker/next-pwa/issues/131#issuecomment-821894809 */
        urlPattern: /^\/api\/(?!auth\/callback\/).*$/i,
        handler: 'NetworkFirst',
        method: 'GET',
        options: {
          cacheName: 'apis',
          expiration: {
            maxEntries: 16,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
          networkTimeoutSeconds: 10, // fall back to cache if api does not response
          // within 10 seconds
        },
      },
      {
        urlPattern: /^\/(?!api\/).*$/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'others',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
          networkTimeoutSeconds: 10,
        },
      },
      {
        urlPattern: 'https://seal.digicert.com/seals/cascade/seal.min.js',
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'digicert',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: 'https://cdn.oribi.io/Xy01ODMwNjU0MjM/oribi.js',
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'oribi',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: 'https://tags.srv.stackadapt.com/events.js',
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'stackadapt',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: /http(s)?:\/\/(www\.)?google\.com\/.*/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'google',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: /http(s)?:\/\/(www\.)?googleads.g.doubleclick\.net\/.*/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'googleadd',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: /http(s)?:\/\/(www\.)?sp.analytics.yahoo\.com\/.*/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'yahoo',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
    ],
  },
};
const nextConfig = enablePWAConfig
  ? { ...baseNextConfig, ...pwaConfig }
  : baseNextConfig;

const siteMapConfig = withSitemap(nextConfig);
const preactConfig = withPreact(siteMapConfig);

module.exports = enablePWAConfig ? withPWA(preactConfig) : preactConfig;

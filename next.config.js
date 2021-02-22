const withSitemap = require("next-with-sitemap");
const { createSecureHeaders } = require("next-secure-headers");

module.exports = withSitemap({
  sitemap: {
    baseUrl: process.env.SM_URL || "https://shop.car.com",
    excludedPaths: [
      "/404/",
      "/[make]/",
      "/[make]/[model]",
      "/api/models/[name]",
      "/api/models/",
      "/api/zipcode/[id]",
      "/api/zipcode/",
      "/fas/",
      "/fas/[make]/[model]/[zipcode]",
      "/fas/[make]/[model]/",
      "/fas/[make]/",
      "/s2/[make]/[model]/[zipcode]",
      "/s2/[make]/[model]/",
      "/s2/[make]/",
      "/s2/",
      "/thankyou/",
    ],
    robots: false,
  },
  target: "serverless",
  images: {
    deviceSizes: [320, 768, 1024],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: createSecureHeaders() },
      {
        source: "/:path*",
        headers: [
          {
            key: "cache-control",
            value: "public, s-maxage=31536000, max-age=31536000",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "cache-control",
            value: "public, s-maxage=31536000, max-age=3600",
          },
        ],
      },
      {
        source: "/:make([a-z-]{1,})",
        headers: [
          {
            key: "cache-control",
            value: "public, s-maxage=31536000, max-age=3600",
          },
        ],
      },
      {
        source: "/:make([a-z-]{1,})/:model([a-z-]{1,})",
        headers: [
          {
            key: "cache-control",
            value: "public, s-maxage=31536000, max-age=3600",
          },
        ],
      },
    ];
  },
});

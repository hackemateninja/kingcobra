module.exports = {
  target: "serverless",
  images: {
    deviceSizes: [320, 768, 1024],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "cache-control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

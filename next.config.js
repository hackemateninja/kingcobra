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
                        value: "public, s-maxage=31536000, max-age=31536000"
                    }
                ]
            },
            {
                source: "/",
                headers: [
                    {
                        key: "cache-control",
                        value: "public, s-maxage=31536000, max-age=3600"
                    }
                ]
            },
            {
                source: "/:make([a-z-]{1,})",
                headers: [
                    {
                        key: "cache-control",
                        value: "public, s-maxage=31536000, max-age=3600"
                    }
                ]
            },
            {
                source: "/:make([a-z-]{1,})/:model([a-z-]{1,})",
                headers: [
                    {
                        key: "cache-control",
                        value: "public, s-maxage=31536000, max-age=3600"
                    }
                ]
            }
        ];
    },
};
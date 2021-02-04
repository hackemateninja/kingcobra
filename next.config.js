module.exports = {
    target: 'serverless',
    images: {
        deviceSizes: [320, 768, 1024],
    },
    async headers() {
        return [
            {
                source: '/:path(.+\\.jpg)*',
                headers: [
                    {
                        key: 'cache-control',
                        value: 'public, max-age=31536000, immutable',
                    }
                ]
            },
            {
                source: '/:path(.+\\.webp)*',
                headers: [
                    {
                        key: 'cache-control',
                        value: 'public, max-age=31536000, immutable',
                    }
                ]
            },
            {
                source: '/favicon/:path*',
                headers: [
                    {
                        key: 'cache-control',
                        value: 'public, max-age=31536000, immutable',
                    }
                ]
            }
        ]
    }
}
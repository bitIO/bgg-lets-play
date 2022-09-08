const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          'https://160hxt8651.execute-api.eu-west-1.amazonaws.com/dev/:path*',
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);

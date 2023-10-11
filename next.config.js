/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap"
      },
      {
        source: "/robots.txt",
        destination: "/api/robots"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
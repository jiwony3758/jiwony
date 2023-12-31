/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Helps avoid extra trailing-slash redirects fighting proxies on /admin
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      { source: "/newsroom", destination: "/news", permanent: true },
      { source: "/newsroom/:slug", destination: "/news/:slug", permanent: true }
    ];
  },
  // Decap expects /admin/config.yml; App Router often 404s dotted paths — proxy to API route
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/admin/config.yml", destination: "/api/cms-config" },
        { source: "/admin/config.yaml", destination: "/api/cms-config" }
      ]
    };
  }
};

module.exports = nextConfig;

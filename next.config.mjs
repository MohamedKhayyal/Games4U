/** @type {import('next').NextConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig = {
  images: {
    remotePatterns: [
      // localhost
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
      // 127.0.0.1 (مهم جدًا)
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
      },
      // production
      {
        protocol: "https",
        hostname: "games4u-ccl4mpf1.b4a.run",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

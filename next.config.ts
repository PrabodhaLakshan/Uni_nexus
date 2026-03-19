import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/notifications",
        destination: "/api/uni-mart/notifications",
      },
      {
        source: "/api/notifications/unread-count",
        destination: "/api/uni-mart/notifications/unread-count",
      },
      {
        source: "/api/notifications/:id",
        destination: "/api/uni-mart/notifications/:id",
      },
      {
        source: "/uni-mart",
        destination: "/modules/uni-mart",
      },
      {
        source: "/uni-mart/:path*",
        destination: "/modules/uni-mart/:path*",
      },
    ];
  },
};

export default nextConfig;

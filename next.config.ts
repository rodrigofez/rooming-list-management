import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/rooming-list-management/events",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

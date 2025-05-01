import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/sunrise-signal",
        destination: "/projects/mobile-development/sunrise-signal",
        permanent: true,
      },
    ];
  },
  transpilePackages: ["next-mdx-remote"],
};
export default nextConfig;

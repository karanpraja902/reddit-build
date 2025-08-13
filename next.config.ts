import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
            hostname: "cdn.sanity.io",
            protocol: "https",
        },
    ],
},
};
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
}
export default nextConfig;

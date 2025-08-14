import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
            hostname: "cdn.sanity.io",
            protocol: "https",
        },
      {
        hostname:"img.clerk.com",
        protocol:"https"
      }
    ],
},
experimental: {
      serverActions: {
        bodySizeLimit: '10mb',
      },
    },
};
// module.exports = {
//   
// }
export default nextConfig;

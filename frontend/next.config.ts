import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/leadership/**" },
      { pathname: "/hospital-logo.*" },
    ],
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "3003", pathname: "/uploads/**" },
      { protocol: "https", hostname: "localhost", port: "3003", pathname: "/uploads/**" },
    ],
  },
};

export default nextConfig;

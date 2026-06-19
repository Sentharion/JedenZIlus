import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const isDev = process.env.NODE_ENV === "production";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev,
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

// Only apply next-pwa in production to avoid Turbopack warnings in development
export default isDev ? nextConfig : withPWA(nextConfig);

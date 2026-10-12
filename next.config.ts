import type { NextConfig } from "next";

const frappeApiUrl =
  process.env.NEXT_PUBLIC_FRAPPE_API_URL || "http://redcross.local:8000";
const frappeApiOrigin = new URL(frappeApiUrl);

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: frappeApiOrigin.protocol.slice(0, -1) as "http" | "https",
        hostname: frappeApiOrigin.hostname,
        ...(frappeApiOrigin.port ? { port: frappeApiOrigin.port } : {}),
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "redcross.local",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "live.staticflickr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.staticflickr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.flickr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    // A deployment without the production backend URL must not proxy files to
    // the developer's local hostname.
    if (!process.env.NEXT_PUBLIC_FRAPPE_API_URL && process.env.NODE_ENV === "production") {
      return [];
    }

    return [
      {
        source: "/files/:path*",
        destination: `${frappeApiUrl}/files/:path*`,
      },
    ];
  },
};

export default nextConfig;

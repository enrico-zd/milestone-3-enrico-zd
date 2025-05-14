import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.gotrendier.com.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tse4.mm.bing.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.gamestegy.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
        pathname: '/**',
      },
  ],
  dangerouslyAllowSVG: true,
  }
};

export default nextConfig;

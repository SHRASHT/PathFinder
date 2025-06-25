/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['inngest']
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'inngest' on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        inngest: false,
      };
    }
    return config;
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  images: {
    domains: ["www.arweave.net", "arweave.net", "shdw-drive.genesysgo.net"],
  },
};

module.exports = nextConfig;

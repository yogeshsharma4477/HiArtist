/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    development_ip: 'http://localhost:8082',
  }
}

module.exports = nextConfig

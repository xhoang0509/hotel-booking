/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'q-xx.bstatic.com',
                port: '',
                pathname: '/image/**',
            },
            {
                protocol: 'https',
                hostname: 'r-xx.bstatic.com',
                port: '',
                pathname: '/image/**',
            },
            {
                protocol: 'https',
                hostname: 'cf.bstatic.com',
                port: '',
                pathname: '/image/**',
            },
        ],
        domains: ['firebasestorage.googleapis.com', 'q-xx.bstatic.com', 'r-xx.bstatic.com', 'cf.bstatic.com'],
    },
};

module.exports = nextConfig;

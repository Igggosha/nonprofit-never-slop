/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "tr.rbxcdn.com",
                port: "",
                pathname: "**",
                search: "",
            },
            // new URL('https://tr.rbxcdn.com'),
        ],
    },
};

module.exports = nextConfig;

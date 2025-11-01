import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.pravatar.cc",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "imagedelivery.net",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "iframe.videodelivery.net",
                port: "",
                pathname: "/**",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: "frame-src 'self' https://iframe.videodelivery.net;",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.101"],
  ...(process.env.BLOG_STATIC_EXPORT === "1" ? {
    output: "export",
    basePath: "/apps/icebreaker",
    trailingSlash: true,
  } : {}),
};

export default nextConfig;

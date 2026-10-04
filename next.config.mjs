/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow phones on the local Wi-Fi to load development assets and HMR.
  allowedDevOrigins: ["192.168.1.101"],
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["source.unsplash.com", "s.gravatar.com", "res.cloudinary.com"],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_PAGES === "true"

const nextConfig = {
  ...(isGhPages && {
    output: "export",
    basePath: "/bottlecap",
    assetPrefix: "/bottlecap/",
    images: { unoptimized: true },
  }),
  transpilePackages: ["three"],
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vert|frag)$/,
      type: "asset/source",
    })
    return config
  },
}

export default nextConfig

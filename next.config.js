/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["2lo.traugutt.net", "lh3.googleusercontent.com", "cdn.discordapp.com", "traugutt.net"],
	},
	experimental: { optimizeCss: true },
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	swcMinify: false, // it should be false by default
};

module.exports = nextConfig;

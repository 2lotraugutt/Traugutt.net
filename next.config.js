/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	output: "standalone",
	images: {
		domains: ["2lo.traugutt.net", "lh3.googleusercontent.com", "cdn.discordapp.com", "traugutt.net"],
	},
	// swcMinify: false, // it should be false by default
};

module.exports = nextConfig;

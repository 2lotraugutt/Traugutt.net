/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["2lo.traugutt.net", "lh3.googleusercontent.com", "cdn.discordapp.com", "traugtt.eu"],
	},
	swcMinify: false, // it should be false by default
};

module.exports = nextConfig

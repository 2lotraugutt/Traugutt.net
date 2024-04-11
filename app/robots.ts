import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/dashboard/",
		},
		sitemap: "https://traugutt.net/sitemap.xml",
		host: "https://traugutt.net",
	};
}

import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await(await fetch(`https://traugutt.net/api/posts?count=500`)).json() as PostDataType[];
	const postSites = posts.map((post) => {
		return {
			url: "https://traugutt.net/post/" + post.id,
			lastModified: post.createdAt,
			priority: 0.9,
		};
	});

	const tags = await(await fetch(`https://traugutt.net/api/calendar/tags`)).json() as EventTagDataType[];
	const tagSites = tags.map((tag) => {
		return {
			url: "https://traugutt.eu/calendar?tag=" + tag.id,
			lastModified: tag.createdAt,
			priority: 0.6,
		};
	});

	const routes = await(await fetch(`https://traugutt.net/api/routes`)).json() as RouteDataType[];
	const routeSites = routes
		.filter((route) => route.link[0] == "/")
		.map((route) => {
			return {
				url: "https://traugutt.net" + route.link,
				lastModified: route.createdAt,
				priority: 0.8,
			};
		});

	const sitemap: MetadataRoute.Sitemap = [
		{
			url: "https://traugutt.net/",
			lastModified: new Date(),
			priority: 1,
		},
		{
			url: "https://traugutt.net/calendar",
			lastModified: new Date(),
			priority: 0.8,
		},
		{
			url: "https://traugutt.net/auth/signin",
			lastModified: new Date(),
			priority: 0.7,
		},
		{
			url: "https://traugutt.net/radio/today",
			lastModified: new Date(),
			priority: 0.7,
		},
		{
			url: "https://traugutt.net/radio",
			lastModified: new Date(),
			priority: 0.8,
		},
		...routeSites,
		...postSites,
		...tagSites,
	];

	return sitemap;
}

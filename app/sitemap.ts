import { MetadataRoute } from "next";

export default async function sitemap() {
	const tags = (await (await fetch(`https://traugutt.eu/api/calendar/tags`)).json()) as EventTagDataType[];
	const tagSites = tags.map((tag) => {
		return {
			url: "https://traugutt.eu/calendar?tag=" + tag.id,
			lastModified: tag.createdAt,
			priority: 0.6,
		};
	});

	const posts = (await (await fetch(`https://traugutt.eu/api/posts?count=500`)).json()) as PostDataType[];
	const postSites = posts.map((post) => {
		return {
			url: "https://traugutt.eu/post/" + post.id,
			lastModified: post.createdAt,
			priority: 0.9,
		};
	});

	const routes = await(await fetch(`https://traugutt.eu/api/routes`)).json() as RouteDataType[];
	const routeSites = routes.map((route) => {
		return {
			url: route.link[0] == "/" ? "https://traugutt.eu" + route.link : route.link,
			lastModified: route.createdAt,
			priority: 0.8,
		};
	});

	const sitemap: MetadataRoute.Sitemap = [
		{
			url: "https://traugutt.eu/",
			lastModified: new Date(),
			priority: 1,
		},
		{
			url: "https://traugutt.eu/calendar",
			lastModified: new Date(),
			priority: 0.8,
		},
		{
			url: "https://traugutt.eu/dashboard",
			lastModified: new Date(),
			priority: 0.8,
		},
		{
			url: "https://traugutt.eu/dashboard/post",
			lastModified: new Date(),
			priority: 0.7,
		},
		{
			url: "https://traugutt.eu/dashboard/personal-posts",
			lastModified: new Date(),
			priority: 0.6,
		},
		{
			url: "https://traugutt.eu/dashboard/posts",
			lastModified: new Date(),
			priority: 0.5,
		},
		{
			url: "https://traugutt.eu/dashboard/announcements",
			lastModified: new Date(),
			priority: 0.5,
		},
		{
			url: "https://traugutt.eu/dashboard/notifications",
			lastModified: new Date(),
			priority: 0.5,
		},
		{
			url: "https://traugutt.eu/dashboard/calendar",
			lastModified: new Date(),
			priority: 0.5,
		},
		{
			url: "https://traugutt.eu/dashboard/numbers",
			lastModified: new Date(),
			priority: 0.5,
		},
		{
			url: "https://traugutt.eu/dashboard/pages",
			lastModified: new Date(),
			priority: 0.5,
		},
		{
			url: "https://traugutt.eu/dashboard/routes",
			lastModified: new Date(),
			priority: 0.5,
		},
		{
			url: "https://traugutt.eu/dashboard/users",
			lastModified: new Date(),
			priority: 0.5,
		},
		{
			url: "https://traugutt.eu/dashboard/account",
			lastModified: new Date(),
			priority: 0.6,
		},
		{
			url: "https://traugutt.eu/auth/signout",
			lastModified: new Date(),
			priority: 0.6,
		},
		{
			url: "https://traugutt.eu/auth/signin",
			lastModified: new Date(),
			priority: 0.7,
		},
		{
			url: "https://traugutt.eu/radio/today",
			lastModified: new Date(),
			priority: 0.7,
		},
		{
			url: "https://traugutt.eu/radio",
			lastModified: new Date(),
			priority: 0.8,
		},
		...routeSites,
		...postSites,
		...tagSites,
	];

	return sitemap;
}

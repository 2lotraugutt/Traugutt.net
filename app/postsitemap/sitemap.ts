"use client"
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = (await (await fetch(`https://traugutt.net/api/posts`)).json()) as PostDataType[];
	const postSites = posts.map((post) => {
		return {
			url: "https://traugutt.net/post/" + post.id,
			lastModified: post.createdAt,
			priority: 0.9,
		};
	});

	return postSites.slice(500);
}

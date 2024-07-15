import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Fetch posts data from  API
	const response = await fetch('https://traugutt.net/api/posts');
	const posts: PostDataType[] = await response.json();

	// Map posts to sitemap format
	const postSites = posts.map((post) => ({
		url: `https://traugutt.net/post/${post.id}`,
		lastModified: post.createdAt,
		priority: 0.9,
	}));

	// Return the first 500 posts for the sitemap
	return postSites.slice(0, 500);
}

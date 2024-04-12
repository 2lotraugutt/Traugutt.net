import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	var date = new Date();
	date.setDate(date.getDate() - 30);
	const count = parseInt(request.nextUrl.searchParams.get("count") || "1");
	const pinned = request.nextUrl.searchParams.get("pinned") == "true" ? true : false;

	let topPosts: PostDataType[] = [];

	if (pinned)
		topPosts = (await prisma.post.findMany({
			take: count,
			orderBy: [
				{
					createdAt: "desc",
				},
			],
			where: {
				pinned: true,
			},
		})) as PostDataType[];

	if (topPosts.length < count) {
		const posts = (await prisma.post.findMany({
			take: count - topPosts.length,
			orderBy: [
				{
					views: "desc",
				},
			],
			where: {
				id: { notIn: topPosts.map((post) => post.id) },
				published: true,
				createdAt: { gte: date },
			},
		})) as PostDataType[];
		topPosts = [...topPosts, ...posts];
	}

	if (topPosts.length < count) {
		const posts = (await prisma.post.findMany({
			take: count - topPosts.length,
			orderBy: [
				{
					createdAt: "desc",
				},
			],
			where: {
				id: { notIn: topPosts.map((post) => post.id) },
				published: true,
			},
		})) as PostDataType[];

		topPosts = [...topPosts, ...posts];
	}

	return NextResponse.json(topPosts);
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
	var date = new Date();
	date.setDate(date.getDate() - 30);
	const count = parseInt(request.nextUrl.searchParams.get("count") || "1");

	let topPosts = await prisma.post.findMany({
		take: count,
		orderBy: [
			{
				views: "desc",
			},
		],
		where: {
			published: true,
			createdAt: { gte: date },
		},
	});
	if (topPosts.length != count) {
		const post = await prisma.post.findMany({
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
		});

		topPosts = [...topPosts, ...post];
	}

	return NextResponse.json(topPosts);
}

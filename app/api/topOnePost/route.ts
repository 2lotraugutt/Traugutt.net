import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
	var date = new Date();
	date.setDate(date.getDate() - 30);

	const topOnePost = await prisma.post.findFirst({
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

	async function fetchFirstPost() {
		const post = await prisma.post.findFirst({
			orderBy: [
				{
					createdAt: "desc",
				},
			],
			where: {
				published: true,
			},
		});
		return post;
	}

	const postToReturn = topOnePost ?? (await fetchFirstPost());

	return NextResponse.json(postToReturn);
}

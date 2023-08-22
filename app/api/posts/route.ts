import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
	const posts = await prisma.post.findMany({
		take: 18,
		orderBy: [
			{
				createdAt: "desc",
			},
		],
	});

	const postToReturn: PostDataType[] = posts;

	return NextResponse.json(postToReturn);
}

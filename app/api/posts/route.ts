import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");
	const author = request.nextUrl.searchParams.get("author");

	const posts = await prisma.post.findMany({
		take: count != 0 ? count : undefined,
		orderBy: [
			{
				pinned: "desc",
			},
			{
				createdAt: "desc",
			},
		],
		where: {
			published: true,
			authorId: author ?? undefined,
		},
	});

	return NextResponse.json(posts);
}

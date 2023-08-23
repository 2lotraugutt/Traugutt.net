import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { count: string } }) {
	const posts = await prisma.post.findMany({
		take: parseInt(params.count),
		orderBy: [
			{
				createdAt: "desc",
			},
		],
		where: { published: true },
	});

	return NextResponse.json(posts);
}

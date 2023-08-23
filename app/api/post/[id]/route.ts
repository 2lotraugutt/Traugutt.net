import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const posts = await prisma.post.findUnique({
		where: { id: params.id },
		include: { author: true },
	});

	return NextResponse.json(posts);
}

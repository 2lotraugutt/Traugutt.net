import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const post = await prisma.post.update({
		where: { id: params.id },
		data: { views: { increment: 1 } },
	});

	return NextResponse.json(post);
}

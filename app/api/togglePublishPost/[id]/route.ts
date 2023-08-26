import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const status = request.nextUrl.searchParams.get("toggle") == "true" ? true : false;

	const post = await prisma.post.update({
		where: { id: params.id },
		data: { published: status },
	});

	return NextResponse.json(post.published);
}

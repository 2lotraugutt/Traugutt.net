import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	const post = await prisma.post.findUnique({
		where: { id: params.id },
		include: { author: true },
	});

	if (post) {
		if (post.published) return NextResponse.json(post);
		else {
			if (session && (session.user.role.managePosts || session.user.id == post.authorId)) {
				return NextResponse.json(post);
			}
		}
	} else return NextResponse.json({});
}

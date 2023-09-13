import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		const post = await prisma.post.delete({
			where: {
				id: params.id,
				authorId: session.user.role.managePosts ? undefined : session.user.id,
			},
		});

		if (post) return NextResponse.json(post);
		else return NextResponse.json({ error: "Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const status = request.nextUrl.searchParams.get("toggle") == "true" ? true : false;

	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;
	const role = session.user.role;

	if (role == "ADMIN" || role == "TEACHER" || role == "EDITOR") {
		const post = await prisma.post.update({
			where: { id: params.id },
			data: { published: status },
		});

		return NextResponse.json(post.published);
	} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
}

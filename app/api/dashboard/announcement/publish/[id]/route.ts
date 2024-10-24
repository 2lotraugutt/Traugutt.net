import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const status = request.nextUrl.searchParams.get("toggle") == "true";

	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.manageAnnouncements) {
			const announcement = await prisma.announcement.update({
				where: { id: params.id },
				data: { published: status, publishedById: session.user.id },
			});

			return NextResponse.json(announcement.published);
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

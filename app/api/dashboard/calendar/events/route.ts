import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");

	if (session) {
		if (session.user.role.manageCalendar) {
			const events = await prisma.event.findMany({
				take: count != 0 ? count : undefined,
				orderBy: [
					{
						createdAt: "desc",
					},
				],
				include: {
					tags: true,
					author: true,
				},
			});

			return NextResponse.json(events);
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

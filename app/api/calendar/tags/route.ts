import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		const tags = await prisma.eventTag.findMany({
			orderBy: [
				{
					events: { _count: "desc" },
				},
			],
		});

		return NextResponse.json(tags);
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const id = params.id;

	const announcement = await prisma.announcement.findFirst({
		where: { AND: [{ id: id }, { published: true }] },
		include: {
			author: true,
			days: {
				orderBy: { timeStamp: "asc" },
			},
		},
	});

	return NextResponse.json(announcement);
}

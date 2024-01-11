import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const id = params.id;

	const announcement = await prisma.announcement.findFirst({
		where: { id: id },
		include: {
			author: true,
			days: {
				orderBy: { timeStamp: "asc" },
			},
		},
	});

	return NextResponse.json(announcement);
}

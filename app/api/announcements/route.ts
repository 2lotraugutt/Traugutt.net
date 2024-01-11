import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");

	const announcements = await prisma.announcement.findMany({
		take: count != 0 ? count : undefined,
		orderBy: [
			{
				createdAt: "desc",
			},
		],
		include: {
			author: true,
			days: {
				orderBy: { timeStamp: "asc" },
			},
		},
	});

	return NextResponse.json(announcements);
}

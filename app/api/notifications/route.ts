import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");

	const notifications = await prisma.notification.findMany({
		orderBy: [
			{
				createdAt: "desc",
			},
		],
		take: count,
	});

	return NextResponse.json(notifications);
}

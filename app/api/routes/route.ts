import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");

	const routes = await prisma.route.findMany({
		orderBy: {
			index: "asc",
		},
		take: count != 0 ? count : undefined,
	});
	return NextResponse.json(routes);
}

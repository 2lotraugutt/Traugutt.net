import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
		const count = parseInt(request.nextUrl.searchParams.get("count") || "0");

		const routes = await prisma.route.findMany({
			take: count != 0 ? count : undefined,
		});
	return NextResponse.json(routes);
}

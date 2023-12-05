import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.managePages) {
			const data = await request.formData();

			const name: string = data.get("name") as string;
			const link: string = data.get("link") as string;
			const category: RouteCategoryDataType = data.get("category") as RouteCategoryDataType;

			await prisma.route.upsert({
				where: { id: params.id },
				update: { name, link },
				create: { name, link, category },
			});

			return NextResponse.json({ success: true });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

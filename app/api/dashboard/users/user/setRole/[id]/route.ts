import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const role = request.nextUrl.searchParams.get("role") || "USER";
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.manageUsers) {
			const users = await prisma.user.update({
				where: { id: params.id },
				data: { roleTag: role },
			});

			return NextResponse.json(users);
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

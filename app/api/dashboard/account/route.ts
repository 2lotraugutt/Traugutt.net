import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		const acccount = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
			include: { role: true },
		});

		return NextResponse.json(acccount);
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function POST(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		const data = await request.formData();

		const name: string = data.get("name") as string;

		await prisma.user.update({
			where: {
				id: session.user.id,
			},
			data: {
				changeName: false,
				name,
			},
		});

		return NextResponse.json({ success: true });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

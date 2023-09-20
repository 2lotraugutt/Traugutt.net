import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.manageNotifications) {
			const data = await request.formData();

			const title: string = data.get("title") as string;
			const content: string = data.get("content") as string;

			await prisma.notification.create({
				data: {
					title: title,
					content: content,
					authorId: session.user.id,
				},
			});

			return NextResponse.json({ success: true });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function GET(request: NextRequest) {
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");

	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.manageNotifications) {
			const notifications = await prisma.notification.findMany({
				take: count != 0 ? count : undefined,
				orderBy: [
					{
						createdAt: "desc",
					},
				],

				include: { author: true },
			});

			return NextResponse.json(notifications);
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function PUT(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.manageNotifications) {
			const data = await request.formData();

			const id: string = data.get("id") as string;
			const title: string = data.get("title") as string;
			const content: string = data.get("content") as string;

			await prisma.notification.update({
				where: { id: id },
				data: {
					title: title,
					content: content,
				},
			});

			return NextResponse.json({ success: true });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function DELETE(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	const data = await request.formData();

	const id: string = data.get("id") as string;

	if (session) {
		if (session.user.role.manageNotifications) {
			await prisma.notification.delete({
				where: {
					id: id,
				},
			});

			return NextResponse.json({ success: true });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

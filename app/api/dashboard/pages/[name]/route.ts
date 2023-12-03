import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request, { params }: { params: { name: string } }) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.managePages) {
			const data = await request.formData();

			const content: string = data.get("content") as string;

			fs.writeFile("./content/" + params.name, content, "utf-8");

			return NextResponse.json({ success: params.name }, { status: 200 });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function DELETE(request: Request, { params }: { params: { name: string } }) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.managePages) {
			fs.rm("./content/" + params.name);

			return NextResponse.json({ success: params.name }, { status: 200 });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

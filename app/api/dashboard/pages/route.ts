import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import fs from "fs";

export async function GET(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.managePages) {
			var files: { file: string; content: string }[] = [];

			const routes: string[] = fs.readdirSync("./content");

			for (var route in routes) {
				const parsedFile = await import("@/content/" + routes[route]);
				files.push({ file: routes[route], content: parsedFile });
			}

			return NextResponse.json(files);
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

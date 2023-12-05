import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import fs from "fs";
import { promises as fsp } from "fs";

export async function GET(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.managePages) {
		const count = parseInt(request.nextUrl.searchParams.get("count") || "0");

			var files: { file: string; content: string }[] = [];

			const routes: string[] = fs.readdirSync("./content");

			for (var route in routes) {
				const parsedFile = await fsp.readFile("./content/" + routes[route], "utf-8");
				files.push({ file: routes[route], content: parsedFile });
			}

			if (count != 0) {
				files = files.slice(0, count);
			}

			return NextResponse.json(files);
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

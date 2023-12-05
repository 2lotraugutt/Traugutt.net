import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(request: NextRequest) {
	try {
		const filePath = "./routes.json";
		const fileContent = await fs.readFile(filePath, "utf-8");
		const routes = JSON.parse(fileContent);

		return NextResponse.json(routes);
	} catch (error) {
		return NextResponse.error();
	}
}

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function GET(request: NextRequest) {
	const returnedData = fs.readFileSync("./pages.json", "utf-8");
	const routes: {
		school: { link: string; name: string }[];
		student: { link: string; name: string }[];
		parents: { link: string; name: string }[];
		recruitation: { link: string; name: string }[];
		exam: { link: string; name: string }[];
		docs: { link: string; name: string }[];
	} = JSON.parse(returnedData);

	return NextResponse.json(routes);
}

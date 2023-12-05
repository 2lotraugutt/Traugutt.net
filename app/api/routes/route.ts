import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const returnedData = await import("@/routes.json");

	const routes: {
		school: { link: string; name: string }[];
		student: { link: string; name: string }[];
		parents: { link: string; name: string }[];
		recruitation: { link: string; name: string }[];
		exam: { link: string; name: string }[];
		docs: { link: string; name: string }[];
	} = returnedData;

	return NextResponse.json(routes);
}

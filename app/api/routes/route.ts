import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	var returnedData = await import("@/routes.json");

	const routes = {
		school: returnedData.school,
		student: returnedData.student,
		parents: returnedData.parents,
		recruitation: returnedData.recruitation,
		exam: returnedData.exam,
		docs: returnedData.docs,
	};

	return NextResponse.json(routes);
}

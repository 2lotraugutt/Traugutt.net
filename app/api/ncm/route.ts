// pages/api/ncm.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const response = await fetch("https://traugutt.net/ncm.json", { cache: "no-store" });
	const data = await response.json();

	// Forward the data to the client
	return NextResponse.json(data);
}

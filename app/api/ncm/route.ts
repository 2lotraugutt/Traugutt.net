// pages/api/ncm.ts
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
	const response = await fetch("https://traugutt.net/ncm.json", { cache: "no-store" });
	const data = await response.json();

	// Create a new response to add cache control headers
	const jsonResponse = NextResponse.json(data);
	jsonResponse.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
	jsonResponse.headers.set("Pragma", "no-cache");
	jsonResponse.headers.set("Expires", "0");

	return jsonResponse;
}

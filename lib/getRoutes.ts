"use server";

import fs from "fs";

export default async function getRoutes() {
	const returnedData = fs.readFileSync("./pages.json", "utf-8");
	const routes: {
		school: { link: string; name: string }[];
		student: { link: string; name: string }[];
		parents: { link: string; name: string }[];
		recruitation: { link: string; name: string }[];
		exam: { link: string; name: string }[];
		docs: { link: string; name: string }[];
	} = JSON.parse(returnedData);

	return routes;
}

"use client";

import { useEffect } from "react";

import { createClient } from "@supabase/supabase-js";
import { eventNames } from "process";

// Create a single supabase client for interacting with your database

export default function ChangeImgDb() {
	const regexMain = /<img[^>]*?\s+src\s*=\s*"([^"]+)"[^>]*?>/gi;
	const regexTrg = /http:\/\/traugutt.net+[^.]+\/+([^\/]+.+[^\/])/gi;
	const regexImg = /\/img+\/+([^\/]+.+[^\/])/gi;
	const regexLo = /\/lo\/+[^.]+\/+([a-z]+.+[a-z])/gi;

	useEffect(() => {
		const supabase = createClient("https://zatxagpbdhgsckpmktsz.supabase.co", process.env.SUPABASE_SUPABASE_KEY!);

		async function fetchData() {
			const { data: news, error } = await supabase.from("news").select("*").eq("id", 2840);

			// console.log(news?.[0].content);
			news?.forEach(async (single) => {
				let m;
				let array: any = [];

				while ((m = regexMain.exec(single.content)) !== null) {
					if (m.index === regexMain.lastIndex) {
						regexMain.lastIndex++;
					}

					// let n;
					// while ((n = regexTrg.exec(m[1])) !== null) {
					// 	// This is necessary to avoid infinite loops with zero-width matches
					// 	if (n.index === regexTrg.lastIndex) {
					// 		regexTrg.lastIndex++;
					// 	}
					// 	array.push("https://zatxagpbdhgsckpmktsz.supabase.co/storage/v1/object/public/archive/" + n[1]);
					// }

					// let n;
					// while ((n = regexImg.exec(m[1])) !== null) {
					// 	// This is necessary to avoid infinite loops with zero-width matches
					// 	if (n.index === regexImg.lastIndex) {
					// 		regexImg.lastIndex++;
					// 	}
					// 	array.push("https://zatxagpbdhgsckpmktsz.supabase.co/storage/v1/object/public/archive/" + n[1]);
					// }

					// let n;
					// while ((n = regexLo.exec(m[1])) !== null) {
					// 	// This is necessary to avoid infinite loops with zero-width matches
					// 	if (n.index === regexLo.lastIndex) {
					// 		regexLo.lastIndex++;
					// 	}
					// 	array.push("https://zatxagpbdhgsckpmktsz.supabase.co/storage/v1/object/public/archive/" + n[1]);
					// }

					// array.push(m[1])
				}

				if (array.length != 0) {
					await supabase.from("news").update({ image_tag: array }).eq("id", single.id);
				}
			});
		}

		fetchData();
	});

	return <div>Enter</div>;
}

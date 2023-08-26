"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import { useState } from "react";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function TogglePublish(props: { postData: PostDataTypeWithAuthor }) {
	const [text, setText] = useState(props.postData.published ? "Ukryj" : "Opublikuj");
	const [status, setStatus] = useState(props.postData.published);

	async function togglePost() {
		setText("Ładowanie...");

		const newStatus = await(await fetch(`/api/dashboard/publishPost/${props.postData.id}?toggle=${!status}`)).json();

		setStatus(newStatus);
		setText(newStatus ? "Ukryj" : "Opublikuj");
	}

	return (
		<>
			<div className={`w-3 h-3 rounded-full flex-none ${status ? "bg-MainGreen" : "bg-MainPurple"}`}></div>

			<button
				onClick={() => togglePost()}
				className={`w-32 transition-all duration-200 flex-none text-center rounded-lg py-1 bg-LightGray hover:text-MainRed hover:bg-LightRed ${plusJakartaSansFont800.className}`}
			>
				{text}
			</button>
		</>
	);
}

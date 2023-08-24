"use client";

import { signIn } from "next-auth/react";

export default function Page() {
	return (
		<div>
			<button
				onClick={() => {
					signIn("github");
				}}
			>
				*
			</button>
		</div>
	);
}

"use client";

import { signOut } from "next-auth/react";

interface Props {
	callbackUrl: string;
}

export default function logout() {
	return (
		<div>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 w-fit border-MainPurple bg-LightPurple p-20 rounded-4xl">
				<h1 className="w-fit">Are you sure you want to sign out?</h1>
			</div>
		</div>
	);
}

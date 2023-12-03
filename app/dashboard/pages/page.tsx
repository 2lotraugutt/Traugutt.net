"use client";

import { getSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingLayout from "@/app/dashboard/loadingLayout";
import PageTile from "./pageTile";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Page() {
	const [userSession, setSession] = useState<SessionDataType>();
	const [pages, setPages] = useState<{ file: string; content: string }[]>([]);

	const router = useRouter();
	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (session.user.role.managePages) {
					fetchPages();
					setSession(session);
				} else router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, [router]);

	async function fetchPages() {
		const returnedPages = await (await fetch(`/api/dashboard/pages`)).json();
		setPages(returnedPages);
	}

	if (pages && userSession)
		return (
			<div className="dashboard-page">
				<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Podstrony</h1>

				<div className="flex w-full flex-col gap-y-3 md:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6">
					{pages.map((pageData) => (
						<PageTile pageData={pageData} />
					))}
				</div>
			</div>
		);
	else return <LoadingLayout />;
}

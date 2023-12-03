"use client";

import { getSession } from "next-auth/react";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingLayout from "@/app/dashboard/loadingLayout";
import PageTile from "./pageTile";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});
const plusJakartaSans800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});
export default function Page() {
	const [userSession, setSession] = useState<SessionDataType>();
	const [pages, setPages] = useState<{ file: string; content: string }[]>([]);
	const [newPageName, setNewPageName] = useState("");
	const [newContent, setNewContent] = useState("");

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

	async function addPage() {
		const data = new FormData();
		data.set("content", newContent);

		const res = await fetch(`/api/dashboard/pages/${newPageName}.mdx`, {
			method: "POST",
			body: data,
		});

		if (!res.ok) throw new Error(await res.text());

		if (res.ok) {
			setNewPageName("");
			setNewContent("");
			fetchPages();
		}
	}

	if (pages && userSession)
		return (
			<div className="dashboard-page">
				<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Podstrony</h1>

				<div className="flex flex-col items-center h-fit w-full text-left border-2 hover:bg-LightGray/40 bg-LightGray/20 transition-all duration-300 py-4 md:py-5 md:px-7 px-4 lg:py-7 lg:px-7 3xl:px-10 xl:py-8 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl">
					<h1 className={`w-full sm:text-xl md:text-2xl ${poppingsFont700.className}`}>Dodaj nową podstronę</h1>
					<input
						value={newPageName}
						onChange={(e) => setNewPageName(e.target.value)}
						type="text"
						id="PageName"
						placeholder="Podaj tytuł"
						className="bg-white rounded-lg p-2 outline-none w-full text-xs sm:text-sm md:text-base"
					/>

					<MdEditor
						modelValue={newContent}
						onChange={setNewContent}
						language="en-US"
						noUploadImg
						placeholder="Podaj treść podstrony"
						className="rounded-lg outline-none bg-white p-2 w-full  h-20 sm:h-40 md:h-52 lg:h-60"
					/>

					<button
						onClick={() => addPage()}
						disabled={newContent.trim() == "" || newPageName.trim() == ""}
						className={`w-fit bg-MainColor hover:bg-MainDarkGray disabled:!bg-MainDarkGray transition-all duration-300 ease-out text-xs sm:text-sm md:text-base lg:text-lg px-20 my-5 py-3 text-white rounded-3xl ${plusJakartaSans800.className}`}
					>
						Dodaj podstronę
					</button>
				</div>

				<div className="flex w-full flex-col gap-y-3 md:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6">
					{pages.map((pageData) => (
						<PageTile pageData={pageData} refetchPages={() => fetchPages()} />
					))}
				</div>
			</div>
		);
	else return <LoadingLayout />;
}

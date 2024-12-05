"use client";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdEditor, MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { getSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function MarkdownDisplay(props: { text: string | null }) {
	const [edit, setEdit] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(true);
	const [newContent, setNewContent] = useState(props.text);

	const router = useRouter();
	const pathname = usePathname();
	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session && session.user.role.managePages) {
				setEdit(true);
			}
		}
		initFunction();
	}, [router]);

	async function confirmEdit() {
		const data = new FormData();
		data.set("content", newContent!);

		const res = await fetch(`/api/dashboard/pages/${pathname.split("/").at(-1)}.mdx`, {
			method: "POST",
			body: data,
		});

		if (!res.ok) throw new Error(await res.text());

		if (res.ok) {
			router.refresh();
		}
	}

	return (
		<div
			id="markdown-container"
			className={`px-3 xs:px-7 flex-col flex gap-y-1 md:gap-y-2 xl:gap-y-3 3xl:gap-y-5 lg:px-24 xl:px-28 md:px-16 2xs:px-5 sm:px-10 2xl:px-48 3xl:px-64 4xl:px-80 py-4 xl:py-20 md:py-12 lg:py-14 sm:py-9 xs:py-6 poppinsFont400`}
		>
			{edit && newContent != null && (
				<div className="flex flex-col h-fit w-full text-left border-2 hover:bg-LightGray/40 bg-LightGray/20 transition-all duration-300 py-4 md:py-5 md:px-7 px-4 lg:py-7 lg:px-7 3xl:px-10 xl:py-8 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl">
					<h1 onClick={() => setShow((old) => !old)} className={`dashboard-heading cursor-pointer poppinsFont700`}>
						Edytuj stronę
					</h1>

					{show && (
						<>
							<MdEditor
								modelValue={newContent}
								onChange={setNewContent}
								language="en-US"
								onSave={confirmEdit}
								noUploadImg
								placeholder="Edytuj treść podstrony"
								className="rounded-lg outline-none bg-white p-2 !h-[70vh] w-full"
							/>

							<button onClick={() => confirmEdit()} className={`group/button dashboard-post-tile plusJakartaSans700`}>
								Potwierdź zmiany
								<div className="dashboard-post-tile-icon">
									<FontAwesomeIcon icon={faCheck} />
								</div>
							</button>
						</>
					)}
				</div>
			)}

			<MdPreview editorId={"preview-only"} modelValue={props.text ?? "# Brak opisu..."} />
		</div>
	);
}

export default MarkdownDisplay;

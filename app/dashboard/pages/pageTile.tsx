import removeMarkdown from "@/lib/removeMarkdown";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { useState } from "react";

const plusJakartaSansFont700 = Plus_Jakarta_Sans({
	weight: "700",
	subsets: ["latin"],
});

const poppingsFont400 = Poppins({
	weight: "400",
	subsets: ["latin"],
});

const poppingsFont700 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

export default function PageTile(props: { pageData: { file: string; content: string }; refetchPages: Function }) {
	const [deleteButtonText, setDeleteButtonText] = useState("Usuń podstronę");

	async function deletePost() {
		setDeleteButtonText("Usuwanie...");

		await (
			await fetch(`/api/dashboard/pages/${props.pageData.file}`, {
				method: "DELETE",
			})
		).json();

		setDeleteButtonText("Usuń podstronę");
		props.refetchPages();
	}

	return (
		<div className="h-fit w-full text-left flex-col xl:flex-row xl:items-center border-2 hover:bg-LightGray/40 transition-all duration-300 py-5 md:py-6 md:px-8 px-5 lg:py-8 lg:px-8 3xl:px-12 xl:py-9 flex gap-y-4 md:gap-y-6 lg:gap-y-10 xl:gap-x-10 rounded-2xl">
			<div className="flex flex-col gap-y-2 xl:gap-y-5 lg:gap-y-3.5 w-full">
				<p className={`line-clamp-2 md:line-clamp-none text-sm 2xs:text-lg xs:text-lg sm:text-xl md:text-2xl 4xl:text-3xl ${poppingsFont700.className}`}>
					{props.pageData.file}
				</p>
				<p
					className={`text-2xs 2xl:text-base text-MainDarkGray/50 2xs:text-xs xs:text-sm 3xl:line-clamp-5 4xl:line-clamp-6 line-clamp-4 ${poppingsFont400.className}`}
				>
					{removeMarkdown(props.pageData.content ?? "")}
				</p>
			</div>

			<div className="flex justify-between xl:justify-normal gap-y-2 2xl:gap-y-3 flex-col md:flex-row xl:flex-col gap-x-5">
				<button onClick={() => deletePost()} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					{deleteButtonText}
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faTrash} />
					</div>
				</button>
			</div>
		</div>
	);
}

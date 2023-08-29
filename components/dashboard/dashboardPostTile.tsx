import removeMarkdown from "@/lib/removeMarkdown";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import Link from "next/link";

const plusJakartaSansFont700 = Plus_Jakarta_Sans({
	weight: "700",
	subsets: ["latin"],
});

const plusJakartaSansFont500 = Plus_Jakarta_Sans({
	weight: "500",
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

export default function DashboardPostTile(props: { postData: PostDataTypeWithAuthor }) {
	const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];

	let date = new Date(props.postData.createdAt);
	const dateToDisplay = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
	return (
		<Link
			href={"/post/" + props.postData.id}
			className="h-fit w-full flex-col border-2 hover:bg-LightGray/40 transition-all duration-300 py-3 px-5 flex gap-y-4 rounded-2xl"
		>
			<p className={`line-clamp-2 text-sm 2xs:text-base xs:text-lg sm:text-xl md:text-2xl xl:text-3xl ${poppingsFont700.className}`}>{props.postData.title}</p>

			<p className={`text-2xs text-MainDarkGray/50 2xs:text-xs line-clamp-4 ${poppingsFont400.className}`}>{removeMarkdown(props.postData.content ?? "")}</p>

			<div className={`flex flex-col gap-y-2 ${plusJakartaSansFont500.className}`}>
				<div className="dashboardPostTileDataRow">
					<p>Publiczny: </p>
					<div className={`dashboardPostTileData flex items-center gap-x-2 ${plusJakartaSansFont700.className}`}>
						<div className={`w-2 h-2 rounded-full ${props.postData.published ? "bg-MainGreen" : "bg-MainPurple"}`} />{" "}
						{props.postData.published ? "Opublikowany" : "Nie opublikowany"}
					</div>
				</div>

				<div className="dashboardPostTileDataRow">
					<p>Data: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{dateToDisplay}</div>
				</div>

				<div className="dashboardPostTileDataRow">
					<p>Wyświetlenia: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{props.postData.views}</div>
				</div>
			</div>

			<div className="flex justify-between gap-x-5">
				<Link
					href={"/dashboard/post/" + props.postData.id}
					className={`group/button transition-all duration-200 hover:bg-MainDarkGray hover:text-white flex text-2xs gap-x-2 border-2 border-MainDarkGray justify-center text-MainDarkGray rounded-3xl py-1.5 w-full ${plusJakartaSansFont700.className}`}
				>
					Edytuj post
					<FontAwesomeIcon
						icon={faPen}
						className="h-2 w-2 bg-MainDarkGray text-white transition-all duration-200 p-1 rounded-full group-hover/button:bg-white group-hover/button:text-MainDarkGray"
					/>
				</Link>
				<button
					onClick={() => {}}
					className={`group/button transition-all duration-200 hover:bg-MainDarkGray hover:text-white flex text-2xs gap-x-2 border-2 border-MainDarkGray justify-center text-MainDarkGray rounded-3xl py-1.5 w-full ${plusJakartaSansFont700.className}`}
				>
					Usuń post
					<FontAwesomeIcon
						icon={faTrash}
						className="h-2 w-2 bg-MainDarkGray text-white transition-all duration-200 p-1 rounded-full group-hover/button:bg-white group-hover/button:text-MainDarkGray"
					/>
				</button>
			</div>
		</Link>
	);
}

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
			className="h-fit w-full flex-col xl:flex-row xl:items-center border-2 hover:bg-LightGray/40 transition-all duration-300 md:py-5 md:px-8 py-3 px-5 lg:px-7 xl:px-10 lg:py-5 xl:py-8 flex gap-y-4 md:gap-y-6 lg:gap-y-10 rounded-2xl"
		>
			<div className="flex xl:max-w-2xl 2xl:max-w-3xl grow 3xl:max-w-4xl 4xl:max-w-screen-lg flex-col gap-y-2 xl:gap-y-5 lg:gap-y-3.5">
				<p className={`line-clamp-2 md:line-clamp-none text-sm 2xs:text-lg xs:text-lg sm:text-xl md:text-2xl ${poppingsFont700.className}`}>
					<span className="me-5">{props.postData.title}</span>
					<span
						className={`px-5 hidden md:inline-block rounded-3xl text-sm lg:py-1 lg:px-7 flex-none text-center h-fit py-0.5 text-white ${
							props.postData.published ? "bg-MainGreen" : "bg-MainPurple"
						} ${plusJakartaSansFont700.className}`}
					>
						{props.postData.published ? "Publiczy" : "Nie publiczny"}
					</span>
				</p>

				<p
					className={`text-2xs 2xl:text-base text-MainDarkGray/50 2xs:text-xs xs:text-sm 3xl:line-clamp-5 4xl:line-clamp-6 line-clamp-4 ${poppingsFont400.className}`}
				>
					{removeMarkdown(props.postData.content ?? "")}
				</p>
			</div>

			<div className={`flex flex-col md:flex-row md:justify-between xl:justify-evenly grow gap-y-2 ${plusJakartaSansFont500.className}`}>
				<div className="dashboardPostTileDataRow md:hidden ">
					<p className="h-fit">Publiczny: </p>
					<div className={`dashboardPostTileData flex items-center gap-x-2 ${plusJakartaSansFont700.className}`}>
						<div className={`w-2 h-2 rounded-full ${props.postData.published ? "bg-MainGreen" : "bg-MainPurple"}`} />{" "}
						{props.postData.published ? "Opublikowany" : "Nie opublikowany"}
					</div>
				</div>

				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Data: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{dateToDisplay}</div>
				</div>

				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Wyświetlenia: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{props.postData.views} wyświetleń</div>
				</div>
			</div>

			<div className="flex justify-between xl:justify-normal gap-y-2 xl:flex-col gap-x-5">
				<Link
					href={"/dashboard/post/" + props.postData.id}
					className={`group/button transition-all duration-200 hover:bg-MainDarkGray hover:text-white items-center flex text-2xs 2xs:text-xs xs:text-sm gap-x-2 border-2 border-MainDarkGray justify-center text-MainDarkGray rounded-3xl py-1.5 w-full ${plusJakartaSansFont700.className}`}
				>
					Edytuj post
					<FontAwesomeIcon
						icon={faPen}
						className="h-2 xs:h-3 w-2 xs:w-3 xs:p-1.5 bg-MainDarkGray text-white transition-all duration-200 p-1 sm:p-1.5 lg:p-2 rounded-full group-hover/button:bg-white group-hover/button:text-MainDarkGray"
					/>
				</Link>
				<button
					onClick={() => {}}
					className={`group/button xl:w-fit xl:px-12 whitespace-nowrap transition-all duration-200 hover:bg-MainDarkGray hover:text-white items-center flex text-2xs 2xs:text-xs xs:text-sm gap-x-2 border-2 border-MainDarkGray justify-center text-MainDarkGray rounded-3xl py-1.5 w-full ${plusJakartaSansFont700.className}`}
				>
					Usuń post
					<FontAwesomeIcon
						icon={faTrash}
						className="h-2 xs:h-3 w-2 xs:w-3 xs:p-1.5 bg-MainDarkGray text-white transition-all duration-200 p-1 sm:p-1.5 lg:p-2 rounded-full group-hover/button:bg-white group-hover/button:text-MainDarkGray"
					/>
				</button>
			</div>
		</Link>
	);
}

// import { faPen } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Poppins } from "next/font/google";
// import Link from "next/link";
// import TogglePublish from "./togglePublish";

// const poppingsFont600 = Poppins({
// 	weight: "600",
// 	subsets: ["latin"],
// });

// const poppingsFont500 = Poppins({
// 	weight: "500",
// 	subsets: ["latin"],
// });

// export default function AdminDashboardPostTile(props: { postData: PostDataTypeWithAuthorAndPublisher }) {
// 	const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];

// 	let date = new Date(props.postData.createdAt);
// 	const dateToDisplay = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
// 	return (
// 		<div className="group h-fit w-full items-center border-2 hover:bg-LightGray/20 transition-all duration-300 p-4 px-8 flex gap-x-7 rounded-2xl">
// 			<TogglePublish postData={props.postData} />

// 			<p className={`truncate ${poppingsFont600.className}`}>{props.postData.title}</p>
// 			<p className="flex-none me-auto">{dateToDisplay}</p>
// 			<p className={poppingsFont600.className}>{props.postData.views}</p>
// 			<p className={`flex-none ${poppingsFont500.className}`}>{props.postData.author.name}</p>
// 			<Link href={"/dashboard/post/" + props.postData.id}>
// 				<FontAwesomeIcon icon={faPen} className="h-5 w-5 text-MainDarkGray hover:text-white transition-all hover:bg-MainDarkGray/70 p-2 rounded-lg" />
// 			</Link>
// 		</div>
// 	);
// }

import removeMarkdown from "@/lib/removeMarkdown";
import { faPushed } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faPaperPlane, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
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

export default function DashboardPostTile(props: { postData: PostDataTypeWithAuthorAndPublisher }) {
	const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
	let date = new Date(props.postData.createdAt);
	const dateToDisplay = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

	function returnViews() {
		const views = props.postData.views;
		if (views == 1) return views + " wyświetlenie";
		else if (views < 5) return views + " wyświetlenia";
		else return views + " wyświetleń";
	}

	return (
		<div className="admistPostTile h-fit w-full text-left flex-col xl:flex-row xl:items-center border-2 hover:bg-LightGray/40 transition-all duration-300 md:py-5 md:px-8 py-3 px-5 lg:px-7 xl:px-10 lg:py-5 xl:py-8 flex gap-y-4 md:gap-y-6 lg:gap-y-10 xl:gap-x-7 rounded-2xl">
			<div className="flex xl:max-w-[33rem] 2xl:max-w-[43rem] 3xl:max-w-4xl 4xl:max-w-[69rem] flex-col gap-y-2 xl:gap-y-5 lg:gap-y-3.5 w-full">
				<p className={`line-clamp-2 md:line-clamp-none text-sm 2xs:text-lg xs:text-lg sm:text-xl md:text-2xl 4xl:text-3xl ${poppingsFont700.className}`}>
					<span className="me-5">{props.postData.title}</span>
					<span
						className={`px-5 hidden md:inline-block rounded-3xl text-sm lg:py-1 lg:px-7 flex-none text-center h-fit py-0.5 text-white ${
							props.postData.published ? "bg-MainGreen" : "bg-MainPurple"
						} ${plusJakartaSansFont700.className}`}
					>
						{props.postData.published ? "Publiczy" : "Nie publiczny"}
					</span>
				</p>

				<div
					className={`text-2xs 2xl:text-base text-MainDarkGray/50 2xs:text-xs xs:text-sm 3xl:line-clamp-5 4xl:line-clamp-6 line-clamp-4 ${poppingsFont400.className}`}
				>
					{removeMarkdown(props.postData.content ?? "")}
				</div>
			</div>

			<div className={`flex flex-col md:justify-between grow md:grid grid-cols-2 lg:gap-5 md:gap-x-5 gap-y-2 ${plusJakartaSansFont500.className}`}>
				<div className="dashboardPostTileDataRow md:hidden">
					<p className="h-fit">Publiczny: </p>
					<div className={`dashboardPostTileData flex items-center gap-x-2 ${plusJakartaSansFont700.className}`}>
						<div className={`w-2 h-2 rounded-full ${props.postData.published ? "bg-MainGreen" : "bg-MainPurple"}`} />{" "}
						{props.postData.published ? "Opublikowany" : "Nie opublikowany"}
					</div>
				</div>

				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Utworzony: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{dateToDisplay}</div>
				</div>
				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Autor: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{props.postData.author.name}</div>
				</div>
				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Wyświetlenia: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{returnViews()}</div>
				</div>

				<div className={`dashboardPostTileDataRow ${props.postData.publishedBy.name ? "" : "!hidden"}`}>
					<p className="h-fit">{props.postData.published ? "Opublikowany przez: " : "Ukryty przez: "}</p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{props.postData.publishedBy.name}</div>
				</div>
			</div>

			<div className="grid grid-cols-2 md:flex justify-between xl:justify-normal gap-y-2 2xl:gap-y-3 flex-col md:flex-row xl:flex-col gap-x-5">
				<Link href={"/post/" + props.postData.id} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					Zobacz post
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faArrowRight} />
					</div>
				</Link>
				<button onClick={() => {}} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					Opublikuj post
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faPaperPlane} />
					</div>
				</button>
				<Link href={"/dashboard/post/" + props.postData.id} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					Edytuj post
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faPen} />
					</div>
				</Link>
				<button onClick={() => {}} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					Usuń post
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faTrash} />
					</div>
				</button>
			</div>
		</div>
	);
}

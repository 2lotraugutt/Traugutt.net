import removeMarkdown from "@/lib/removeMarkdown";
import { faArrowRight, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

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

export default function DashboardPostTile(props: { postData: PostDataTypeWithAuthorAndPublisher; refetchPosts: Function }) {
	const [deleteButtonText, setDeleteButtonText] = useState("Usuń post");

	function returnViews() {
		const views = props.postData.views;
		if (views == 1) return views + " wyświetlenie";
		else if (views < 5) return views + " wyświetlenia";
		else return views + " wyświetleń";
	}

	async function deletePost() {
		setDeleteButtonText("Usuwanie...");

		const data = new FormData();
		data.set("id", props.postData.id);

		const post = await(
			await fetch(`/api/dashboard/posts/post/`, {
				body: data,
				method: "DELETE",
			})
		).json();
		
		props.refetchPosts();
	}

	const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
	let date = new Date(props.postData.createdAt);
	const dateToDisplay = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

	return (
		<div className="h-fit w-full text-left flex-col xl:flex-row xl:items-center border-2 hover:bg-LightGray/40 transition-all duration-300 py-5 md:py-6 md:px-8 px-5 lg:py-8 lg:px-8 3xl:px-12 xl:py-9 flex gap-y-4 md:gap-y-6 lg:gap-y-10 xl:gap-x-10 rounded-2xl">
			<div className="flex xl:max-w-[36rem] 2xl:max-w-[47rem] 3xl:max-w-4xl 4xl:max-w-[72rem] flex-col gap-y-2 xl:gap-y-5 lg:gap-y-3.5 w-full">
				<p className={`line-clamp-2 md:line-clamp-none text-sm 2xs:text-lg xs:text-lg sm:text-xl md:text-2xl 4xl:text-3xl ${poppingsFont700.className}`}>
					<span className="me-5">{props.postData.title}</span>
					<span
						className={`px-5 hidden md:inline-block rounded-3xl text-sm lg:py-1 lg:px-7 flex-none text-center h-fit py-0.5 text-white ${
							props.postData.published ? "bg-MainColor" : "bg-SecondColor"
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

			<div
				className={`flex flex-col md:flex-row md:justify-between xl:justify-evenly xl:gap-5 grow gap-y-2 ${
					props.postData.publishedBy && props.postData.published ? "flex-wrap" : ""
				} ${plusJakartaSansFont500.className}`}
			>
				<div className="dashboardPostTileDataRow md:hidden ">
					<p className="h-fit">Publiczny: </p>
					<div className={`dashboardPostTileData flex items-center gap-x-2 ${plusJakartaSansFont700.className}`}>
						<div className={`w-2 h-2 rounded-full ${props.postData.published ? "bg-MainColor" : "bg-SecondColor"}`} />{" "}
						{props.postData.published ? "Opublikowany" : "Nie opublikowany"}
					</div>
				</div>

				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Utworzony: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{dateToDisplay}</div>
				</div>

				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Wyświetlenia: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{returnViews()}</div>
				</div>

				<div className={`dashboardPostTileDataRow ${props.postData.publishedBy && props.postData.published ? "" : "!hidden"}`}>
					<p className="h-fit">Opublikowany przez: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{props.postData.publishedBy?.name}</div>
				</div>
			</div>

			<div className="flex justify-between xl:justify-normal gap-y-2 2xl:gap-y-3 flex-col md:flex-row xl:flex-col gap-x-5">
				<Link
					href={"/post/" + props.postData.id}
					className={`${props.postData.published ? "" : "hidden"} group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}
				>
					Zobacz post
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faArrowRight} />
					</div>
				</Link>
				<Link href={"/dashboard/post/" + props.postData.id} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					Edytuj post
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faPen} />
					</div>
				</Link>
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

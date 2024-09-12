import removeMarkdown from "@/lib/removeMarkdown";
import { faArrowRight, faLink, faPen, faThumbTack, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPostTile(props: { postData: PostDataType; refetchPosts: Function }) {
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

		const post = await (
			await fetch(`/api/dashboard/posts/post/`, {
				body: data,
				method: "DELETE",
			})
		).json();

		props.refetchPosts();
	}

	const months = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
	let date = new Date(props.postData.createdAt);
	const dateToDisplay = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

	return (
		<div className="h-fit w-full text-left flex-col xl:flex-row xl:items-center border-2 hover:bg-LightGray/40 transition-all duration-300 py-5 md:py-6 md:px-8 px-5 lg:py-8 lg:px-8 3xl:px-12 xl:py-9 flex gap-y-4 md:gap-y-6 lg:gap-y-10 xl:gap-x-10 rounded-2xl">
			<div className="flex xl:max-w-[36rem] 2xl:max-w-[47rem] 3xl:max-w-4xl 4xl:max-w-[72rem] flex-col gap-y-2 xl:gap-y-5 lg:gap-y-3.5 w-full">
				<p className={`line-clamp-2 md:line-clamp-none text-sm 2xs:text-lg xs:text-lg sm:text-xl md:text-2xl 4xl:text-3xl flex items-center poppinsFont700`}>
					<span className="me-4">{props.postData.title}</span>

					<span
						className={`px-5 hidden md:inline-block rounded-3xl text-sm lg:py-1 lg:px-7 flex-none text-center h-fit py-0.5 text-white ${
							props.postData.published ? "bg-MainColor" : "bg-SecondColor"
						} plusJakartaSans700`}
					>
						{props.postData.published ? "Publiczy" : "Nie publiczny"}
					</span>

					{(props.postData.eventId || props.postData.pinned) && (
						<div className="ms-2.5 hidden md:inline-flex items-center gap-4 xs:gap-5 bg-MainColor z-10 text-white w-fit text-xs xl:text-base 4xl:text-base 2xl:text-lg 3xl:px-6 rounded-2xl sm:py-1.5 lg:py-1.5 py-0.5 px-1.5 sm:px-3">
							{props.postData.eventId && <FontAwesomeIcon icon={faLink} />}
							{props.postData.pinned && <FontAwesomeIcon icon={faThumbTack} />}
						</div>
					)}
				</p>

				<p className={`text-2xs 2xl:text-base text-MainDarkGray/50 2xs:text-xs xs:text-sm 3xl:line-clamp-5 4xl:line-clamp-6 line-clamp-4 poppinsFont400`}>
					{removeMarkdown(props.postData.content ?? "")}
				</p>
			</div>

			<div
				className={`flex flex-col md:flex-row md:justify-between xl:justify-evenly xl:gap-5 grow gap-y-2 ${
					props.postData.publishedBy && props.postData.published ? "flex-wrap" : ""
				} plusJakartaSans500`}
			>
				<div className="dashboardPostTileDataRow md:hidden ">
					<p className="h-fit">Publiczny: </p>
					<div className={`dashboardPostTileData flex items-center gap-x-2 plusJakartaSans700`}>
						<div className={`w-2 h-2 rounded-full ${props.postData.published ? "bg-MainColor" : "bg-SecondColor"}`} />{" "}
						{props.postData.published ? "Opublikowany" : "Nie opublikowany"}
					</div>
				</div>

				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Utworzony: </p>
					<div className={`dashboardPostTileData plusJakartaSans700`}>{dateToDisplay}</div>
				</div>

				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Wyświetlenia: </p>
					<div className={`dashboardPostTileData plusJakartaSans700`}>{returnViews()}</div>
				</div>

				<div className={`dashboardPostTileDataRow ${props.postData.publishedBy && props.postData.published ? "" : "!hidden"}`}>
					<p className="h-fit">Opublikowany przez: </p>
					<div className={`dashboardPostTileData plusJakartaSans700`}>{props.postData.publishedBy?.name}</div>
				</div>

				<div className="dashboardPostTileDataRow md:hidden">
					<p className="h-fit">Przypięty: </p>
					<div className={`dashboardPostTileData flex items-center gap-x-2 plusJakartaSans700`}>
						<div className={`w-2 h-2 rounded-full ${props.postData.pinned ? "bg-MainColor" : "bg-SecondColor"}`} />{" "}
						{props.postData.pinned ? "Przypięty" : "Nie przypięty"}
					</div>
				</div>
			</div>

			<div className="flex justify-between xl:justify-normal gap-y-2 2xl:gap-y-3 flex-col md:flex-row xl:flex-col gap-x-5">
				<Link href={"/post/" + props.postData.id} className={`${props.postData.published ? "" : "hidden"} group/button dashboard-post-tile plusJakartaSans700`}>
					Zobacz post
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faArrowRight} />
					</div>
				</Link>
				<Link href={"/dashboard/post/" + props.postData.id} className={`group/button dashboard-post-tile plusJakartaSans700`}>
					Edytuj post
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faPen} />
					</div>
				</Link>
				<button onClick={() => deletePost()} className={`group/button dashboard-post-tile plusJakartaSans700`}>
					{deleteButtonText}
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faTrash} />
					</div>
				</button>
			</div>
		</div>
	);
}

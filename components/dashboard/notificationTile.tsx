import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
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

export default function NotificationTile(props: { notificationData: NotificationWithAutorDataType; refetchNotifications: Function }) {
	const [deleteButtonText, setDeleteButtonText] = useState("Usuń wiadomość");

	async function deleteNotification() {
		setDeleteButtonText("Usuwanie...");

		const notification = await (await fetch(`/api/dashboard/notifications/delete/${props.notificationData.id}`)).json();

		await props.refetchNotifications();
		setDeleteButtonText("Usuń wiadomość");
	}

	const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
	let date = new Date(props.notificationData.createdAt);
	const dateToDisplay = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

	return (
		<div className="admistPostTile h-fit w-full text-left flex-col xl:flex-row xl:items-center border-2 hover:bg-LightGray/40 transition-all duration-300 py-5 md:py-6 md:px-8 px-5 lg:py-8 lg:px-8 3xl:px-12 xl:py-9 flex gap-y-4 md:gap-y-6 lg:gap-y-10 xl:gap-x-14 3xl:gap-x-16 rounded-2xl">
			<div className="flex flex-col gap-y-2 xl:gap-y-5 lg:gap-y-3.5 w-full">
				<p className={`line-clamp-2 md:line-clamp-none text-sm 2xs:text-lg xs:text-lg sm:text-xl md:text-2xl 4xl:text-3xl ${poppingsFont700.className}`}>
					{props.notificationData.title}
				</p>

				<div
					className={`text-2xs 2xl:text-base text-MainDarkGray/50 2xs:text-xs xs:text-sm 3xl:line-clamp-[7] 4xl:line-clamp-[8] line-clamp-6 ${poppingsFont400.className}`}
				>
					{props.notificationData.content}
				</div>
			</div>

			<div className={`flex flex-col md:justify-between grow lg:gap-y-5 2xl:gap-y-7 xl:gap-y-9 md:gap-x-5 gap-y-2 ${plusJakartaSansFont500.className}`}>
				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Utworzony: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{dateToDisplay}</div>
				</div>
				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Autor: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{props.notificationData.author.name}</div>
				</div>
			</div>

			<div className="flex sm:grid sm:grid-cols-2 md:flex justify-between xl:justify-normal gap-y-2 2xl:gap-y-3 flex-col md:flex-row xl:flex-col gap-x-5">
				<button onClick={() => {}} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					Edytuj wiadomość
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faPen} />
					</div>
				</button>

				<button onClick={() => deleteNotification()} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					{deleteButtonText}
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faTrash} />
					</div>
				</button>
			</div>
		</div>
	);
}

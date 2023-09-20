import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parse } from "date-fns";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";

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

const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

const poppingsFont700 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

export default function EventTile(props: { eventData: EventDataTypeWithAuthor; refetchEvents: Function }) {
	function returnDate(date: string) {
		const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];

		let newDate = new Date(date);

		if (isNaN(newDate.getTime())) newDate = parse(date, "dd-mm-yyyy", new Date());

		return newDate.getDate() + " " + months[newDate.getMonth()] + " " + newDate.getFullYear();
	}

	return (
		<div className="h-fit w-full text-left flex-col xl:flex-row xl:items-center border-2 hover:bg-LightGray/40 transition-all duration-300 py-5 md:py-6 md:px-8 px-5 lg:py-8 lg:px-8 3xl:px-12 xl:py-9 flex gap-y-4 md:gap-y-6 lg:gap-y-10 xl:gap-x-10 rounded-2xl">
			<div className="flex xl:max-w-[34rem] 2xl:max-w-[46.5rem] 3xl:max-w-4xl 4xl:max-w-[69rem] flex-col gap-y-2 xl:gap-y-5 lg:gap-y-3.5 w-full">
				<p className={`line-clamp-1 md:line-clamp-2 text-sm 2xs:text-lg xs:text-lg sm:text-xl md:text-2xl 4xl:text-3xl ${poppingsFont700.className}`}>
					{props.eventData.name}
				</p>

				<div
					className={`text-2xs 2xl:text-base text-MainDarkGray/50 2xs:text-xs xs:text-sm 3xl:line-clamp-5 4xl:line-clamp-6 line-clamp-4 ${poppingsFont400.className}`}
				>
					{props.eventData.description}
				</div>

				<div className="flex items-center gap-x-2 sm:gap-x-3 hide-scrollbar overflow-x-auto w-full">
					{props.eventData.tags.map((tag, i) => (
						<div key={tag.id} className={`flex h-fit rounded-3xl py-1 gap-x-2 px-2 sm:px-3 items-center transition-color duration-300 bg-white`}>
							<div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-color duration-300 `} style={{ backgroundColor: tag.color }} />
							<p className={`text-xs whitespace-nowrap sm:text-sm md:text-base transition-color duration-300 ${poppingsFont500.className} text-MainDarkGray`}>
								{tag.name}
							</p>
						</div>
					))}
				</div>
			</div>

			<div className={`flex flex-col md:flex-row md:justify-between xl:justify-evenly xl:gap-5 grow gap-y-2 flex-wrap ${plusJakartaSansFont500.className}`}>
				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Data: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{returnDate(props.eventData.date)}</div>
				</div>
				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Utworzony: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{returnDate(props.eventData.createdAt.toString())}</div>
				</div>
				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Autor: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{props.eventData.author.name}</div>
				</div>
			</div>

			<div className="flex sm:grid sm:grid-cols-2 md:flex justify-between xl:justify-normal gap-y-2 2xl:gap-y-3 flex-col md:flex-row xl:flex-col gap-x-5">
				<button onClick={() => {}} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					Edytuj wydarzenie
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faPen} />
					</div>
				</button>
				<button onClick={() => {}} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					Usuń wydarzenie
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faTrash} />
					</div>
				</button>
			</div>
		</div>
	);
}

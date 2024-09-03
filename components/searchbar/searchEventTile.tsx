"use client";
import { HighlightSearchPhrase } from "@/lib/highlightSearchPhrase";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function SearchEventTile(props: { event: EventDataTypeWithPost; searchPhrase: string; toggle: Function }) {
	const { push } = useRouter();

	const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];

	let date = new Date(props.event.createdAt);
	const dateToDisplay = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="text-sm flex gap-y-0.5 flex-col bg-white lg:text-base outline-none rounded-lg md:rounded-xl w-full p-1 md:p-2 lg:p-2.5"
		>
			<div className="flex flex-row gap-x-2 md:gap-x-3 items-center justify-between">
				<div>{HighlightSearchPhrase(props.event.name, props.searchPhrase)}</div>

				<div className="flex gap-x-1 ms-auto">
					{props.event.tags.map((tag, i) => (
						<div
							onClick={() => {
								push("/calendar?tag=" + tag.id);
								props.toggle();
							}}
							key={tag.id}
							className={`flex group cursor-pointer h-fit rounded-3xl py-0.5 gap-x-1.5 px-1.5 sm:px-2 bg-LightGray/30 items-center`}
						>
							<div className={`h-1.5 w-1.5 my-1 md:my-1.5 2xl:my-2 sm:h-2 sm:w-2 rounded-full`} style={{ backgroundColor: tag.color }} />

							<p
								className={`hidden group-hover:block whitespace-nowrap transition-all text-MainDarkGray rounded-xs text-2xs lg:text-sm md:rounded-xs 2xl:text-base poppinsFont500`}
							>
								{tag.name}
							</p>
						</div>
					))}
				</div>

				{props.event.post && (
					<FontAwesomeIcon
						icon={faLink}
						onClick={() => {
							push("/post/" + props.event.post!.id);
							props.toggle();
						}}
						className="bg-MainColor cursor-pointer hover:bg-SecondColor transition-all text-white rounded-full aspect-square p-1"
					/>
				)}

				<div className={`text-white bg-DarkColor/90 w-fit text-2xs lg:text-xs 2xl:text-base rounded-2xl py-1 px-2 sm:px-3 sm:py-1.5 plusJakartaSansFont600`}>
					{dateToDisplay}
				</div>
			</div>

			<div className="text-2xs lg:text-sm md:rounded-xs 2xl:text-base">{HighlightSearchPhrase(props.event.description ?? "", props.searchPhrase)}</div>
		</motion.div>
	);
}

export default SearchEventTile;

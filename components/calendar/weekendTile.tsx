import { Plus_Jakarta_Sans } from "next/font/google";
import EventsContainer from "./eventsContainer";
import { format, getDate, isToday } from "date-fns";
import { motion } from "framer-motion";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function WeekendTile(props: { date: Date; events?: EventDataType[]; setExpDay: Function; differentMonth: boolean }) {
	return (
		<motion.div
			layoutId={format(props.date, "dd-MM-yyyy")}
			onClick={() => props.setExpDay(format(props.date, "dd-MM-yyyy"))}
			className={`day-tile relative cursor-pointer ${props.differentMonth ? "bg-MediumGray/10" : "bg-MediumGray/30"} ${
				isToday(props.date) ? "!border-[1.5px] md:!border-2 scale-105 md:scale-110 border-MainDarkGray/30" : ""
			}`}
		>
			<div
				className={`${props.differentMonth ? "bg-LightGray text-MainDarkGray/50" : "bg-MediumGray text-MainDarkGray/70"} day-number ${
					plusJakartaSansFont800.className
				}`}
			>
				{getDate(props.date)}
			</div>
			{props.events ? <EventsContainer events={props.events} /> : <></>}

			{props.events && props.events.length != 0 && (
				<div className="flex absolute left-1/2 -translate-x-1/2 2xs:bottom-1 md:hidden xs:bottom-2 -bottom-1.5 items-center gap-x-1">
					<motion.div className="h-1 w-1 xs:w-1.5 xs:h-1.5 sm:h-2 sm:w-2 rounded-full bg-MainDarkGray/60"></motion.div>
					<p className={`hidden sm:block text-xs ${plusJakartaSansFont800.className}`}>{props.events.length}</p>
				</div>
			)}
		</motion.div>
	);
}

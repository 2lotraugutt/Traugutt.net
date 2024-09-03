import { isToday, isWeekend } from "date-fns";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import EventsContainer from "./eventsContainer";
import WeekendTile from "./weekendTile";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function DatabaseTile(props: { day: DayDataType; setExpDay: Function }) {
	const date = new Date(props.day.year, props.day.month, props.day.day);
	if (isWeekend(date)) return <WeekendTile date={date} events={props.day.events} setExpDay={props.setExpDay} differentMonth={false} />;
	else
		return (
			<motion.div
				onClick={() => props.setExpDay(props.day.date)}
				layoutId={props.day.date}
				className={`cursor-pointer relative day-tile md:!justify-between ${
					props.day.freeDay ? "md:border-[1px] !border-[#1fd15d] bg-[#E2FFEC]/60" : "bg-LightColor/20"
				} ${isToday(date) ? "!border-[1.5px] md:!border-2 scale-105 md:scale-110 border-SecondColor/50" : ""}`}
			>
				<motion.div className="flex justify-center sm:justify-between items-center w-full">
					<motion.div className={`day-number plusJakartaSansFont800 ${props.day.freeDay ? "bg-[#44D375]/20 text-[#1fd15e]" : "bg-LightColor text-SecondColor"}`}>
						{props.day.day}
					</motion.div>
					<motion.div
						className={`outline-[3px] lg:outline-4 outline-LightColor me-0.5 lg:me-1 outline bg-LightColor/40 text-center w-[19px] md:w-6 lg:w-7 xl:w-9 3xl:w-10 4xl:w-11 h-fit p-0.5 md:p-1 xl:p-1.5 4xl:p-2 rounded-full text-2xs md:text-xs lg:text-sm xl:text-base 3xl:text-xl text-MainDarkGray ${
							plusJakartaSansFont800.className
						} ${props.day.freeDay || !props.day.number ? "hidden" : "hidden sm:block"}`}
					>
						{props.day.number}
					</motion.div>
				</motion.div>

				<EventsContainer events={props.day.events} />

				{props.day.events.length != 0 && (
					<div className="flex absolute left-1/2 -translate-x-1/2 2xs:bottom-1 md:hidden xs:bottom-2 -bottom-1.5 items-center gap-x-1">
						<motion.div className="h-1 w-1 xs:w-1.5 xs:h-1.5 sm:h-2 sm:w-2 rounded-full bg-MainColor"></motion.div>
						<p className={`hidden sm:block text-xs plusJakartaSansFont800`}>{props.day.events.length}</p>
					</div>
				)}
			</motion.div>
		);
}

import { format, getDate, isToday, isWeekend } from "date-fns";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import WeekendTile from "./weekendTile";

const plusJakartaSans800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function DayTile(props: { date: Date; differentMonth: boolean; setExpDay: Function }) {
	if (isWeekend(props.date)) return <WeekendTile date={props.date} setExpDay={props.setExpDay} differentMonth={props.differentMonth} />;
	else
		return (
			<motion.div
				layoutId={format(props.date, "dd-MM-yyyy")}
				onClick={() => props.setExpDay(format(props.date, "dd-MM-yyyy"))}
				className={`day-tile ${props.differentMonth ? "bg-MediumGray/10" : "bg-LightColor/30"} ${
					isToday(props.date) ? "border-[1.5px] md:border-2 scale-105 md:scale-110 border-SecondColor/50" : ""
				} ${props.setExpDay && "cursor-pointer"}`}
			>
				<motion.div className={`day-number ${props.differentMonth ? "bg-LightGray text-MainDarkGray/50" : "bg-LightColor text-SecondColor"} plusJakartaSans800`}>
					{getDate(props.date)}
				</motion.div>
			</motion.div>
		);
}

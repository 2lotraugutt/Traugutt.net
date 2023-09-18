import { getDate, isToday, isWeekend } from "date-fns";
import { Plus_Jakarta_Sans } from "next/font/google";
import WeekendTile from "./weekendTile";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function DayTile(props: { date: Date; differentMonth: boolean }) {
	if (isWeekend(props.date)) return <WeekendTile date={props.date} />;
	else
		return (
			<div
				className={`day-tile ${props.differentMonth ? "bg-MediumGray/10" : "bg-LightPurple/30"} ${
					isToday(props.date) ? "border-[1.5px] md:border-2 scale-105 md:scale-110 border-MainPurple/50" : ""
				}`}
			>
				<div
					className={`day-number ${props.differentMonth ? "bg-LightGray text-MainDarkGray/50" : "bg-LightPurple text-MainPurple"} ${
						plusJakartaSansFont800.className
					}`}
				>
					{getDate(props.date)}
				</div>
			</div>
		);
}

import { isWeekend } from "date-fns";
import { Plus_Jakarta_Sans } from "next/font/google";
import WeekendTile from "./weekendTile";
import EventsContainer from "./eventsContainer";
import { da } from "date-fns/locale";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function DatabaseTile(props: { day: DayDataTypeWithEvents }) {
	if (isWeekend(props.day.timeStamp)) return <WeekendTile dayNumber={props.day.day} events={props.day.events} />;
	else
		return (
			<div
				className={`aspect-[14/15] p-3.5 justify-between flex flex-col rounded-3xl ${
					props.day.freeDay ? "border-[1px] border-DarkGreen bg-LightGreen/30" : "bg-LightPurple/20"
				} `}
			>
				<div className="flex justify-between items-center pe-1">
					<div
						className={`p-1.5 text-center w-10 rounded-full text-xl ${plusJakartaSansFont800.className} ${
							props.day.freeDay ? "bg-MainGreen/20 text-DarkGreen" : "bg-LightPurple text-MainPurple"
						}`}
					>
						{props.day.day}
					</div>
					<div
						className={`outline-4 outline-LightPurple outline bg-LightPurple/40 text-center w-8 h-fit p-1 rounded-full text-md text-MainDarkGray ${
							plusJakartaSansFont800.className
						} ${props.day.freeDay ? "hidden" : ""}`}
					>
						{props.day.number}
					</div>
				</div>

				<EventsContainer events={props.day.events} />
			</div>
		);
}

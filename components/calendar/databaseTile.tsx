import { isWeekend } from "date-fns";
import { Plus_Jakarta_Sans } from "next/font/google";
import WeekendTile from "./weekendTile";
import EventsContainer from "./eventsContainer";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function DatabaseTile(props: { day: DayDataTypeWithEvents }) {
	if (isWeekend(new Date(props.day.year, props.day.month, props.day.day))) return <WeekendTile dayNumber={props.day.day} events={props.day.events} />;
	else
		return (
			<div className={`day-tile md:!justify-between ${props.day.freeDay ? "border-[1px] border-DarkGreen bg-LightGreen/30" : "bg-LightPurple/20"} `}>
				<div className="flex justify-center sm:justify-between items-center w-full">
					<div
						className={`day-number ${plusJakartaSansFont800.className} ${props.day.freeDay ? "bg-MainGreen/20 text-DarkGreen" : "bg-LightPurple text-MainPurple"}`}
					>
						{props.day.day}
					</div>
					<div
						className={`outline-[3px] lg:outline-4 outline-LightPurple me-0.5 lg:me-1 outline bg-LightPurple/40 text-center w-[19px] md:w-6 lg:w-7 xl:w-9 3xl:w-10 4xl:w-11 h-fit p-0.5 md:p-1 xl:p-1.5 4xl:p-2 rounded-full text-2xs md:text-xs lg:text-sm xl:text-base 3xl:text-xl text-MainDarkGray ${
							plusJakartaSansFont800.className
						} ${props.day.freeDay || !props.day.number ? "hidden" : "hidden sm:block"}`}
					>
						{props.day.number}
					</div>
				</div>

				<EventsContainer events={props.day.events} />
			</div>
		);
}

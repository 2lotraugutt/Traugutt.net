import { Plus_Jakarta_Sans } from "next/font/google";
import EventsContainer from "./eventsContainer";
import { getDate, isToday } from "date-fns";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function WeekendTile(props: { date: Date; events?: EventDataType[] }) {
	return (
		<div className={`day-tile bg-MediumGray/30 ${isToday(props.date) ? "!border-[1.5px] md:!border-2 scale-105 md:scale-110 border-MainDarkGray/30" : ""}`}>
			<div className={`bg-MediumGray day-number text-MainDarkGray/70 ${plusJakartaSansFont800.className}`}>{getDate(props.date)}</div>
			{props.events ? <EventsContainer events={props.events} /> : <></>}
		</div>
	);
}

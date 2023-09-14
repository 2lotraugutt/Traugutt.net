import { Plus_Jakarta_Sans } from "next/font/google";
import EventsContainer from "./eventsContainer";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function WeekendTile(props: { dayNumber: number; events?: EventDataType[] }) {
	return (
		<div className="day-tile bg-MediumGray/30">
			<div className={`bg-MediumGray day-number text-MainDarkGray/70 ${plusJakartaSansFont800.className}`}>{props.dayNumber}</div>
			{props.events ? <EventsContainer events={props.events} /> : <></>}
		</div>
	);
}

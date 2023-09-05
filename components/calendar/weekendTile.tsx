import { Plus_Jakarta_Sans } from "next/font/google";
import EventsContainer from "./eventsContainer";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function WeekendTile(props: { dayNumber: number; events?: EventDataType[] }) {
	return (
		<div className="aspect-[14/15] borsder-[1.5px] p-3.5 flex flex-col justify-between rounded-3xl border-dashed border-MainDarkGray bg-MediumGray/30">
			<div className={`bg-MediumGray p-1.5 text-center w-10 rounded-full text-xl text-MainDarkGray/70 ${plusJakartaSansFont800.className}`}>{props.dayNumber}</div>
			{props.events ? <EventsContainer events={props.events} /> : <></>}
		</div>
	);
}

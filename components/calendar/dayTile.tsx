import { getDate, isWeekend } from "date-fns";
import { Plus_Jakarta_Sans } from "next/font/google";
import WeekendTile from "./weekendTile";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function DayTile(props: { date: Date; differentMonth: boolean }) {
	if (isWeekend(props.date)) return <WeekendTile dayNumber={getDate(props.date)} />;
	else
		return (
			<div className={`aspect-[14/15] border-[1.5px] p-3.5 rounded-3xl border-dashed border-MainDarkGray ${props.differentMonth ? "bg-MediumGray/10" : ""}`}>
				{" "}
				<div className={`bg-LightPurple p-1.5 text-center w-10 rounded-full text-xl text-MainPurple ${plusJakartaSansFont800.className}`}>{getDate(props.date)}</div>
			</div>
		);
}

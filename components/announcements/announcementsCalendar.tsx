import { format, getDaysInMonth, getISODay, startOfMonth } from "date-fns";

export default function AnnouncementsCalendar(props: { month: number; year: number; setSelectedDays: Function; selectedDays: string[] }) {
	const date = new Date(props.year, props.month, 1);
	const monthLen = getDaysInMonth(date);
	const firstDayOfMonth = getISODay(startOfMonth(date)) - 1;
	const today = new Date();
	const d = today.getDate();
	const m = today.getMonth();
	const y = today.getFullYear();
	return (
		<div key={m} className="grid grid-cols-7 gap-2.5 text-base lg:text-base 2xl:text-lg">
			{[...Array(firstDayOfMonth)].map((_, j) => {
				return <div className={`w-7 h-7`} key={j}></div>;
			})}
			{[...Array(monthLen)].map((_, j) => {
				const day = j + 1;
				const date = format(new Date(props.year, props.month, day), "dd-MM-yyyy");
				const isSelected = props.selectedDays.indexOf(date) != -1;
				return (
					<button
						disabled={(m >= props.month && d > day) || (firstDayOfMonth + j) % 7 == 6 || (firstDayOfMonth + j) % 7 == 5}
						onClick={() => {
							let newList = [...props.selectedDays];
							const index = props.selectedDays.indexOf(date);

							if (isSelected) newList.splice(index);
							else newList.push(date);

							props.setSelectedDays(newList);
						}}
						key={j}
						className={`w-7 h-7 rounded-lg ${isSelected ? "bg-MainColor/70" : "bg-MainDarkGray/10"} ${
							((firstDayOfMonth + j) % 7 == 6 || (firstDayOfMonth + j) % 7 == 5) && "!bg-MainDarkGray/30"
						} ${day == d && props.month == m && props.year == y ? "scale-110 border-MainColor border-2" : ""} ${m >= props.month && d > day && "opacity-60"}`}
					>
						{day}
					</button>
				);
			})}
		</div>
	);
}

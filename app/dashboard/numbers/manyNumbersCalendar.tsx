import { format, getDaysInMonth, getISODay, isWithinInterval, parse, startOfMonth } from "date-fns";

export default function ManyNumbersCalendar(props: { month: number; year: number; startDate: string | null; endDate: string | null; setRange: Function }) {
	const date = new Date(props.year, props.month, 1);
	const monthLen = getDaysInMonth(date);
	const firstDayOfMonth = getISODay(startOfMonth(date)) - 1;
	const today = new Date();
	const d = today.getDate();
	const m = today.getMonth();
	const y = today.getFullYear();

	const handleDateClick = (selectedDate: string) => {
		if (!props.startDate) {
			props.setRange(selectedDate, null);
		} else if (!props.endDate) {
			const parsedStart = parse(props.startDate, "dd-MM-yyyy", new Date());
			const parsedEnd = parse(selectedDate, "dd-MM-yyyy", new Date());
			if (parsedEnd < parsedStart) {
				props.setRange(selectedDate, props.startDate);
			} else {
				props.setRange(props.startDate, selectedDate);
			}
		} else {
			props.setRange(null, null);
		}
	};

	const monthsNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

	return (
		<div>
			<h1 className={`sm:text-lg md:text-xl text-center lg:text-2xl poppinsFont500 mb-2`}>{monthsNames[props.month]}</h1>

			<div key={m} className="grid grid-cols-7 gap-2.5 text-base lg:text-base 2xl:text-lg">
				{[...Array(firstDayOfMonth)].map((_, j) => (
					<div className="w-7 h-7" key={j}></div>
				))}
				{[...Array(monthLen)].map((_, j) => {
					const day = j + 1;
					const date = format(new Date(props.year, props.month, day), "dd-MM-yyyy");
					const isSelected =
						props.startDate &&
						props.endDate &&
						isWithinInterval(parse(date, "dd-MM-yyyy", new Date()), {
							start: parse(props.startDate, "dd-MM-yyyy", new Date()),
							end: parse(props.endDate, "dd-MM-yyyy", new Date()),
						});
					const isWeekend = (firstDayOfMonth + j) % 7 === 6 || (firstDayOfMonth + j) % 7 === 5;

					return (
						<button
							disabled={isWeekend}
							onClick={() => handleDateClick(date)}
							key={j}
							className={`w-7 h-7 rounded-lg ${isSelected ? "bg-MainColor/70" : "bg-MainDarkGray/10"} ${isWeekend && "!bg-MainDarkGray/30"} ${
								date === props.startDate || date === props.endDate
									? "bg-SecondColor/80"
									: day === d && props.month === m && props.year === y
									? "scale-110 border-MainColor border-2"
									: ""
							}`}
						>
							{day}
						</button>
					);
				})}
			</div>
		</div>
	);
}

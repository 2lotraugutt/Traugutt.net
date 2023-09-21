import { Poppins } from "next/font/google";

const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function EventsContainer(props: { events: EventDataType[] }) {
	return (
		<div className="flex-col justify-end grow hidden md:flex w-full gap-0.5 xl:gap-1 3xl:gap-1.5">
			{props.events.map((event, i) => {
				let classes = "";

				if (props.events.length == 1) classes = "line-clamp-2";
				else if (props.events.length == 2) classes = "line-clamp-1 2xl:line-clamp-2";
				else classes = "line-clamp-1";

				return (
					<button
						key={i}
						className={`event-container bg-MainPurple text-center text-2xs lg:text-xs xl:text-sm 2xl:text-sm 3xl:text-base py-[3px] px-1.5 xl:px-2.5 2xl:px-3 2xl:py-1.5 text-white rounded-lg xl:rounded-xl 
						 ${classes}
						 ${poppingsFont500.className}`}
					>
						{event.name}
					</button>
				);
			})}
		</div>
	);
}

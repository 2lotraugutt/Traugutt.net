export default function EventComponent(props: { event: EventDataType; len: number }) {
	return (
		<div
			className={`w-full event-container transition-all duration-300 bg-SecondColor text-center text-2xs lg:text-xs xl:text-sm 2xl:text-sm 3xl:text-base py-[3px] px-1.5 xl:px-2.5 2xl:px-3 2xl:py-1.5 text-white rounded-lg xl:rounded-xl 
						${props.len == 1 ? "lg:line-clamp-2" : props.len == 2 ? "lg:line-clamp-1 2xl:line-clamp-2" : "lg:line-clamp-1"} poppinsFont500`}
		>
			{props.event.name}
		</div>
	);
}

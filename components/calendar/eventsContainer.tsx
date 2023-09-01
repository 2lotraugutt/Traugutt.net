export default function EventsContainer(props: { events: EventDataType[] }) {
	return (
		<div className="flex flex-col">
			{props.events.map((event) => {
				return <div className="bg-MainPurple text-sm py-1 px-3 text-white rounded-lg">{event.name}</div>;
			})}
		</div>
	);
}

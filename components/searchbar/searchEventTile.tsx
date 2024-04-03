function SearchEventTile(props: { event: EventDataTypeWithPost }) {
	return <div className="text-sm bg-white lg:text-base outline-none rounded-lg md:rounded-xl w-full p-1 md:p-2 lg:p-2.5">{props.event.name}</div>;
}

export default SearchEventTile;

import { motion } from "framer-motion";

function SearchEventTile(props: { event: EventDataTypeWithPost }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="text-sm bg-white lg:text-base outline-none rounded-lg md:rounded-xl w-full p-1 md:p-2 lg:p-2.5"
		>
			{props.event.name}
		</motion.div>
	);
}

export default SearchEventTile;

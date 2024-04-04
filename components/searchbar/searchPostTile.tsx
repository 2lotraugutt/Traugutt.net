import { motion } from "framer-motion";

function SearchPostTile(props: { post: PostDataType }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="text-sm bg-white lg:text-base outline-none rounded-lg md:rounded-xl w-full p-1 md:p-2 lg:p-2.5"
		>
			{props.post.title}
		</motion.div>
	);
}

export default SearchPostTile;

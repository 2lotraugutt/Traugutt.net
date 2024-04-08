import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function SearchPostTile(props: { post: PostDataType; toggle: Function }) {
	const { push } = useRouter();

	return (
		<motion.div
			onClick={() => {
				push("/post/" + props.post.id);
				props.toggle();
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="text-sm cursor-pointer hover:bg-MainDarkGray/10 transition-all bg-white lg:text-base outline-none rounded-lg md:rounded-xl w-full p-1 md:p-2 lg:p-2.5"
		>
			{props.post.title}
		</motion.div>
	);
}

export default SearchPostTile;

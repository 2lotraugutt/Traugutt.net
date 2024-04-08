import { HighlightSearchPhrase } from "@/lib/highlightSearchPhrase";
import removeMarkdown from "@/lib/removeMarkdown";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function SearchPostTile(props: { post: PostDataType; toggle: Function; searchPhrase: string }) {
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
			<div className="flex flex-row gap-x-2 md:gap-x-3 items-center justify-between">
				<div>{HighlightSearchPhrase(props.post.title, props.searchPhrase)}</div>
			</div>

			<div className="text-2xs line-clamp-2 lg:text-sm md:rounded-xs 2xl:text-base">
				{HighlightSearchPhrase(removeMarkdown(props.post.content ?? ""), props.searchPhrase)}
			</div>
		</motion.div>
	);
}

export default SearchPostTile;

import { AnimatePresence, motion } from "framer-motion";
import { Poppins } from "next/font/google";
import LoadingTile from "./loadingTile";
import SearchEventTile from "./searchEventTile";
import SearchPostTile from "./searchPostTile";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function ResultContainer(props: { posts: PostDataType[]; events: EventDataTypeWithPost[]; fetched: boolean; searchPhrase: string; toggle: Function }) {
	return (
		<motion.div
			layout
			transition={{
				opacity: { ease: "linear" },
				layout: { duration: 0.1 },
			}}
			className="flex flex-col text-left border-2 bg-LightGray p-1.5 md:p-2 lg:p-2.5 2xl:p-3 gap-y-2 md:gap-y-3 rounded-2xl"
		>
			<div className="flex flex-col gap-y-1.5">
				<h3 className={`3xl:text-2xl ms-1 md:text-base text-xs xs:text-sm lg:text-xl ${poppingsFont700.className}`}>Posty:</h3>
				{props.posts.map((post) => (
					<SearchPostTile key={post.id} post={post} toggle={props.toggle} searchPhrase={props.searchPhrase} />
				))}

				<AnimatePresence>{!props.fetched && <LoadingTile />}</AnimatePresence>
			</div>
			<div className="flex flex-col gap-y-1.5">
				<h3 className={`3xl:text-2xl ms-1 md:text-base text-xs xs:text-sm lg:text-xl ${poppingsFont700.className}`}>Wydarzenia:</h3>
				{props.events.map((event) => (
					<SearchEventTile key={event.id} event={event} toggle={props.toggle} searchPhrase={props.searchPhrase} />
				))}

				<AnimatePresence>{!props.fetched && <LoadingTile />}</AnimatePresence>
			</div>
		</motion.div>
	);
}

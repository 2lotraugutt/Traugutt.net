import { Poppins } from "next/font/google";
import SearchEventTile from "./searchEventTile";
import SearchPostTile from "./searchPostTile";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function (props: { posts: PostDataType[]; events: EventDataTypeWithPost[]; fetched: boolean }) {
	return (
		<div className="flex flex-col text-left border-2 bg-LightGray p-1.5 md:p-2 lg:p-2.5 2xl:p-3 gap-y-2 md:gap-y-3 rounded-2xl">
			{!props.fetched && (
				<div className="flex flex-row justify-center bg-white rounded-lg md:rounded-xl w-full p-1 md:p-2 lg:p-2.5">
					<div className="bg-MainDarkGray h-3 w-3 m-1.5 rounded-full animate-pulse"></div>
					<div className="bg-MainDarkGray h-3 w-3 m-1.5 rounded-full animate-pulse"></div>
					<div className="bg-MainDarkGray h-3 w-3 m-1.5 rounded-full animate-pulse"></div>
					<div className="bg-MainDarkGray h-3 w-3 m-1.5 rounded-full animate-pulse"></div>
					<div className="bg-MainDarkGray h-3 w-3 m-1.5 rounded-full animate-pulse"></div>
				</div>
			)}

			<div className="flex flex-col gap-y-1.5">
				<h3 className={`3xl:text-2xl ms-1 md:text-base text-xs xs:text-sm lg:text-xl ${poppingsFont700.className}`}>Posty:</h3>
				{props.posts.map((post) => (
					<SearchPostTile post={post} />
				))}
			</div>
			<div className="flex flex-col gap-y-1.5">
				<h3 className={`3xl:text-2xl ms-1 md:text-base text-xs xs:text-sm lg:text-xl ${poppingsFont700.className}`}>Wydarzenia:</h3>
				{props.events.map((event) => (
					<SearchEventTile event={event} />
				))}
			</div>
		</div>
	);
}

import { useEffect, useState } from "react";
import ResultsContainer from "./resultsContainer";

export default function SearchContainer(props: { toggle: Function }) {
	const [input, setInput] = useState("");
	const [count, setCount] = useState<number>(1);
	const [fetched, setFetched] = useState<boolean>(false);
	const [results, setResults] = useState<{ posts: PostDataType[]; events: EventDataTypeWithPost[] }>({ posts: [], events: [] });

	useEffect(() => {
		setFetched(false);
		handleFetch();
	}, [input]);

	async function handleFetch() {
		const returnedResults = await (await fetch(`/api/search?count=${count * 4}&search=${input}`)).json();
		setResults(returnedResults);
		setFetched(true);
	}

	return (
		<>
			<div className="flex flex-col gap-0.5 md:gap-2 fixed z-40 max-w-screen-xs sm:max-w-screen-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:max-w-screen-md lg:max-w-screen-xl">
				<div className="flex text-left border-2 bg-LightGray p-1.5 md:p-2 lg:p-2.5 2xl:p-3 gap-y-1.5 rounded-2xl">
					<input
						type="text"
						placeholder="Wyszukaj..."
						className="text-sm lg:text-base outline-none rounded-lg md:rounded-xl w-full py-1 md:py-2 md:px-3 px-1 lg:py-3 lg:px-3.5"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
				</div>

				{input != "" && (results.posts.length > 0 || results.events.length > 0) && (
					<ResultsContainer fetched={fetched} events={results.events} posts={results.posts} />
				)}
			</div>

			<div className="fixed z-20 cursor-pointer top-0 backdrop-blur-sm left-0 w-screen h-screen" onClick={() => props.toggle()}></div>
		</>
	);
}

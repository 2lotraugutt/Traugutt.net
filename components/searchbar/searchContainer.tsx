import { ChangeEvent, useState } from "react";

export default function SearchContainer(props: { toggle: Function }) {
	const [input, setInput] = useState("");
	const [count, setCount] = useState<number>(1);
	const [results, setResults] = useState<{ post: PostDataType[]; event: EventDataTypeWithPost[] }>();

	async function handleInput(e: ChangeEvent<HTMLInputElement>) {
		setInput(e.target.value);

		const returnedResults = await (await fetch(`/api/search?count=${count * 3}&search=${input}`)).json();
		setResults(returnedResults);
	}

	return (
		<>
			<div className="fixed z-40 max-w-screen-xs sm:max-w-screen-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:max-w-screen-md lg:max-w-screen-xl flex flex-col items-center text-left border-2 bg-LightGray p-2 md:p-2.5 lg:p-3 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl">
				<input
					type="text"
					placeholder="Wyszukaj..."
					className="text-sm lg:text-base outline-none rounded-lg md:rounded-xl w-full py-1 md:py-2 md:px-3 px-1 lg:py-3 lg:px-3.5"
					value={input}
					onChange={handleInput}
				/>
			</div>
			<div className="fixed z-20 cursor-pointer top-0 backdrop-blur-sm left-0 w-screen h-screen" onClick={() => props.toggle()}></div>
		</>
	);
}

"use client";

import { Poppins } from "next/font/google";
import PostTile from "./postTile";
import { useEffect, useState } from "react";

const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

export default function PostContainer() {
	const [posts, setPosts] = useState<PostDataType[]>([]);
	const [count, setCount] = useState<number>(1);
	const [firstLoad, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		fetchPosts();
	}, []);

	async function fetchPosts() {
		const posts = await(await fetch(`api/posts?count=${count * 12}`)).json();

		setPosts(posts);
		setCount((oldCount) => oldCount + 1);
		setLoaded(true);
	}

	return (
		<section className="w-full flex flex-col items-center gap-y-5 md:gap-y-8 xl:gap-y-10 2xl:gap-y-14 4xl:gap-y-16">
			<div className="grid w-full grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-2 lg:gap-3 xl:gap-5 4xl:gap-6 4xl:grid-cols-3">
				{firstLoad
					? posts.map((postData: PostDataType) => <PostTile postData={postData} key={postData.id} />)
					: [...Array(12)].map((n, i) => (
							<div className="relative w-full rounded-3xl xs:rounded-4xl aspect-[25/16] bg-MainDarkGray" key={i}>
								<div className="bg-white/80 absolute top-4 xs:top-8 left-4 xs:left-8 w-1/4 h-[7%] animate-pulse rounded-2xl"></div>

								<div className="w-4/5 h-4 xs:h-6 xs:left-7 xs:bottom-14 md:h-5 md:bottom-12 md:rounded-md 2xl:rounded-lg lg:bottom-16 2xl:bottom-20 3xl:bottom-24 lg:h-7 3xl:h-9 4xl:h-8 bg-white animate-pulse bottom-10 absolute left-4 rounded-sm"></div>
								<div className="w-2/3 h-4 xs:h-6 xs:left-7 xs:bottom-6 md:h-5 lg:h-7 3xl:h-9 md:rounded-md 2xl:rounded-lg lg:bottom-8 2xl:bottom-11 3xl:bottom-14 4xl:h-8 bg-white/70 animate-pulse bottom-5 absolute left-4 rounded-sm"></div>
							</div>
					  ))}
			</div>

			<button
				onClick={() => fetchPosts()}
				className={`text-MainDarkGray bg-white border-MainDarkGray border-2 text-xs xs:text-sm md:text-base xl:text-lg px-8 py-1.5 2xl:text-lg 3xl:text-xl 3xl:py-2 3xl:px-12 rounded-3xl hover:bg-MainDarkGray hover:text-white transition-all duration-200 ease-out ${poppingsFont600.className}`}
			>
				Załaduj więcej
			</button>
		</section>
	);
}

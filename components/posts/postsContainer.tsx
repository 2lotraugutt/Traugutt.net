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

	useEffect(() => {
		fetchPosts();
	}, []);

	async function fetchPosts() {
		const posts = await(await fetch(`api/posts/${count * 12}`)).json();

		setPosts(posts);
		setCount((oldCount) => oldCount + 1);
	}

	return (
		<section className="w-full flex flex-col items-center gap-y-5 md:gap-y-8 xl:gap-y-10 2xl:gap-y-14 4xl:gap-y-16">
			<div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-2 lg:gap-3 4xl:grid-cols-3">
				{posts.map((postData: PostDataType) => (
					<PostTile postData={postData} key={postData.id} />
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

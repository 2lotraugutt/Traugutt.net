"use client";

import PostGallery from "@/components/postPage/postGallery";
import PostHeading from "@/components/postPage/postHeading";
import PostSkeleton from "@/components/postPage/postSkeleton";
import PostTileSkeleton from "@/components/posts/postTileSkeleton";
import TopPostTile from "@/components/posts/topPostTile";
import markdownToHTML from "@/lib/markdownToHTML";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

const poppingsFont400 = Poppins({
	weight: "400",
	subsets: ["latin"],
});

export default function Page({ params }: { params: { id: string } }) {
	const [post, setPost] = useState<PostDataTypeWithAuthor | undefined>();
	const [topPosts, setTopPost] = useState<PostDataType[] | undefined>();

	useEffect(() => {
		fetchPosts();
		fetchTopPosts();
		async function fetchTopPosts() {
			const posts = await (await fetch("/api/posts/topPosts/?count=3")).json();

			setTopPost(posts);
		}

		async function fetchPosts() {
			const hasViewed = localStorage.getItem(`viewed_${params.id}`);

			const post = await (await fetch(`/api/posts/post/${params.id}`)).json();

			setPost(post);
			if (!hasViewed) {
				fetch(`/api/posts/post/views/${params.id}`);

				localStorage.setItem(`viewed_${params.id}`, "true");
			}
		}
	}, [params.id]);

	return (
		<div className="flex flex-col w-full">
			{post ? (
				<>
					<PostHeading post={post} />
					<div
						id="markdown-container"
						className={`px-3 xs:px-7 flex-col flex gap-y-1 md:gap-y-2 xl:gap-y-3 3xl:gap-y-5 lg:px-24 xl:px-28 md:px-16 2xs:px-5 sm:px-10 2xl:px-48 3xl:px-64 4xl:px-80 py-4 xl:py-20 md:py-12 lg:py-14 sm:py-9 xs:py-6 ${poppingsFont400.className}`}
					>
						{markdownToHTML(post.content ?? "# Brak opisu...")}
					</div>

					<PostGallery post={post} />
				</>
			) : (
				<PostSkeleton />
			)}

			<div className="lg:mx-12 mx-3 xs:mx-7 2xs:mx-5 sm:mx-10 md:mx-5 4xl:mx-0">
				<h2
					className={`text-center my-5 4xl:text-5xl text-sm !leading-[150%] h-fit xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl peer line-clamp-2 tracking-wide ${poppingsFont700.className}`}
				>
					Najpopularniejsze posty w tym miesiącu
				</h2>

				<div id="top-posts-container" className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 w-full md:gap-2 lg:gap-4 xl:gap-7 4xl:gap-10 last:text-black">
					{topPosts
						? topPosts.map((postData: PostDataType, i) => <TopPostTile postData={postData} key={postData.id} index={i + 1} />)
						: [...Array(3)].map((i) => <PostTileSkeleton key={i} />)}
				</div>
			</div>
		</div>
	);
}
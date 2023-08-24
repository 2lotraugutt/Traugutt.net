"use client";

import markdownToHTML from "@/lib/markdownToHTML";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

const poppingsFont400 = Poppins({
	weight: "400",
	subsets: ["latin"],
});

export default function Page({ params }: { params: { id: string } }) {
	const [post, setPost] = useState<PostDataTypeWithAuthor | undefined>();

	useEffect(() => {
		fetchPosts();
		async function fetchPosts() {
			const post = await (await fetch(`/api/post/${params.id}`)).json();

			setPost(post);
		}
	}, []);

	if (post) {
		const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

		let date = new Date(post?.createdAt);
		const dateToDisplay = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

		return (
			<div className="flex flex-col w-full">
				<div className="relative">
					<Image
						alt="Title image"
						src={post.titleImage}
						width={1920}
						height={1080}
						className="aspect-[16/12] w-full md:aspect-[16/9] xl:aspect-[2] 2xl:aspect-[16/7] object-cover"
					/>

					<div className="flex bg-gradient-to-t md:gap-y-2.5 sm:gap-y-2 from-MainDarkGray via-MainDarkGray/80 to-MainDarkGray/0 flex-col absolute text-white left-0 bottom-0 pb-4 px-3 xl:pb-20 xs:px-7 md:pb-12 lg:px-24 lg:pb-14 xl:px-28 md:px-16 xs:pb-6 2xs:px-5 sm:px-10 sm:pb-9 2xl:px-48 3xl:px-64 4xl:px-80 w-full gap-y-1 xl:gap-y-4">
						<div className="flex flex-row items-center gap-x-2 xl:gap-x-4">
							<p className={`text-xs sm:text-sm md:text-base 3xl:text-lg 4xl:text-xl ${poppingsFont600.className}`}>
								{post.author.firstName + " " + post.author.lastName}
							</p>

							<div className="bg-white xl:h-1.5 w-1 xl:w-1.5 h-1 rounded-full"></div>

							<p className={`text-xs md:text-sm 4xl:text-lg ${poppingsFont400.className}`}>{dateToDisplay}</p>
						</div>

						<h1
							className={`4xl:text-6xl text-base !leading-[150%] h-fit sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl peer line-clamp-2 tracking-wide ${poppingsFont700.className}`}
						>
							{post.title}
						</h1>
					</div>
				</div>

				<div
					id="markdown-container"
					className={`px-3 xs:px-7 flex-col flex gap-y-1 md:gap-y-2 xl:gap-y-3 3xl:gap-y-5 lg:px-24 xl:px-28 md:px-16 2xs:px-5 sm:px-10 2xl:px-48 3xl:px-64 4xl:px-80 pt-4 xl:pt-20 md:pt-12 lg:pt-14 sm:pt-9 xs:pt-6 ${poppingsFont400.className}`}
				>
					{markdownToHTML(post.content!)}
				</div>
			</div>
		);
	}
}
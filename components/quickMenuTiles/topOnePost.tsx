"use client";

import removeMarkdown from "@/lib/removeMarkdown";
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopOnePost() {
	const [topOnePost, setTopOnePost] = useState<JustPostDataType | undefined>();

	useEffect(() => {
		fetchPost();
		async function fetchPost() {
			const post = await (await fetch("api/posts/topPosts?pinned=true")).json();

			setTopOnePost(post[0]);
		}
	}, []);

	if (topOnePost != undefined)
		return (
			<Link
				href={"/post/" + topOnePost.id}
				className="group col-span-2 row-span-2 md:col-span-2 overflow-hidden cursor-pointer relative rounded-3xl xs:rounded-4xl aspect-[25/16]"
			>
				<div
					className={`bg-white z-10 text-MainDarkGray absolute top-4 xs:top-8 left-4 xs:left-8 w-fit text-xs sm:text-base 2xl:text-xl rounded-2xl py-0.75 px-4 sm:px-8 plusJakartaSans800`}
				>
					{topOnePost.pinned ? <FontAwesomeIcon icon={faThumbTack} /> : <> TOP #1</>}
				</div>

				<img className="w-full h-full object-cover absolute" src={topOnePost.titleImage} alt="Top 1 image" height={1080} width={1920} />

				<div className="w-full rounded-3xl xs:rounded-4xl aspect-[25/16] bg-MainDarkGray "></div>

				<div className="from-MainDarkGray/95 to-MainDarkGray bg-gradient-to-b flex flex-col text-white 2xs:group-hover:-translate-y-full duration-300 ease-out transition-all -translate-y-10">
					<h3
						className={`from-MainDarkGray/0 via-MainDarkGray/80 bg-gradient-to-b 3xl:text-4xl line-clamp-2 md:text-lg 4xl:text-3xl to-MainDarkGray/95 pt-4 w-full text-base xs:text-2xl lg:text-3xl absolute 2xs:-translate-y-full -translate-y-2/3 xs:px-6 md:px-8 left-0 px-3 poppinsFont700`}
					>
						{topOnePost.title}
					</h3>

					<p
						className={`group-hover:delay-75 text-transparent ease-out duration-300 md:line-clamp-4 lg:line-clamp-6 transition-all w-full line-clamp-6 2xs:group-hover:text-white 4xl:text-lg 2xl:text-base 2xl:mt-4 text-sm mt-2 mb-8 xs:px-6 md:px-8 px-3 poppinsFont400`}
					>
						{removeMarkdown(topOnePost.content ?? "")}
					</p>
				</div>
			</Link>
		);
	else
		return (
			<div className="relative col-span-2 row-span-2 md:col-span-2 w-full rounded-3xl xs:rounded-4xl aspect-[25/16] bg-MainDarkGray">
				<div className="bg-white/80 absolute top-4 xs:top-8 left-4 xs:left-8 w-1/4 h-[7%] animate-pulse rounded-2xl"></div>

				<div className="w-4/5 h-4 xs:h-6 xs:left-7 xs:bottom-14 md:h-5 md:bottom-12 md:rounded-md 2xl:rounded-lg lg:bottom-16 2xl:bottom-20 3xl:bottom-24 lg:h-7 3xl:h-9 4xl:h-8 bg-white animate-pulse bottom-10 absolute left-4 rounded-sm"></div>
				<div className="w-2/3 h-4 xs:h-6 xs:left-7 xs:bottom-6 md:h-5 lg:h-7 3xl:h-9 md:rounded-md 2xl:rounded-lg lg:bottom-8 2xl:bottom-11 3xl:bottom-14 4xl:h-8 bg-white/70 animate-pulse bottom-5 absolute left-4 rounded-sm"></div>
			</div>
		);
}

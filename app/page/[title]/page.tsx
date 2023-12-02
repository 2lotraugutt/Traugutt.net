"use client";

import "md-editor-rt/lib/preview.css";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";

const poppingsFont400 = Poppins({
	weight: "400",
	subsets: ["latin"],
});

export default async function Page({ params: { title } }: { params: { title: string } }) {
	const Content = await getPostData(title);
	return (
		<div
			id="markdown-container"
			className={`px-3 xs:px-7 flex-col flex gap-y-1 md:gap-y-2 xl:gap-y-3 3xl:gap-y-5 lg:px-24 xl:px-28 md:px-16 2xs:px-5 sm:px-10 2xl:px-48 3xl:px-64 4xl:px-80 py-4 xl:py-20 md:py-12 lg:py-14 sm:py-9 xs:py-6 ${poppingsFont400.className}`}
		>
			{<Content />}
		</div>
	);
}

async function getPostData(title: string) {
	const router = useRouter();

	return dynamic(() => import(`@/content/${title}.mdx`).catch((e) => router.back()), {
		loading: () => (
			<div
				id="markdown-container"
				className="px-3 xs:px-7 w-full relative flex-col flex gap-y-1 md:gap-y-2 xl:gap-y-3 3xl:gap-y-5 lg:px-24 xl:px-28 md:px-16 2xs:px-5 sm:px-10 2xl:px-48 3xl:px-64 4xl:px-80 py-4 xl:py-20 md:py-12 lg:py-14 sm:py-9 xs:py-6"
			>
				<h1 className="!w-2/3 bg-MainDarkGray/60 4xl:h-16 h-4 sm:h-5 md:h-6 lg:h-7 xl:h-9 2xl:h-12 animate-pulse rounded"></h1>

				<div className="animate-pulse">
					<div className="3xl:h-5 h-3 sm:h-4 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-10/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-11/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-7/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
				</div>

				<div className="block-quote animate-pulse">
					<div className="3xl:h-5 h-3 sm:h-4 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-11/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 xl:h-5 w-1/3 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
				</div>

				<div className="animate-pulse">
					<div className="3xl:h-5 h-3 sm:h-4 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-11/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-10/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-8/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-11/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-1/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
				</div>

				<div className="animate-pulse">
					<div className="3xl:h-5 h-3 sm:h-4 w-9/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-11/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-9/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-3/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
				</div>

				<h1 className="!w-1/2 bg-MainDarkGray/60 4xl:h-16 h-4 sm:h-5 md:h-6 lg:h-7 xl:h-9 2xl:h-12 animate-pulse rounded"></h1>

				<ul className="animate-pulse">
					<li className="3xl:h-5 h-3 sm:h-4 xl:h-5 w-2/12 bg-MainDarkGray/60 rounded-sm !my-0.5 md:!my-1 lg:!my-1.5 2xl:!my-2"></li>
					<li className="3xl:h-5 h-3 sm:h-4 xl:h-5 w-5/12 bg-MainDarkGray/60 rounded-sm !my-0.5 md:!my-1 lg:!my-1.5 2xl:!my-2"></li>
					<li className="3xl:h-5 h-3 sm:h-4 xl:h-5 w-3/12 bg-MainDarkGray/60 rounded-sm !my-0.5 md:!my-1 lg:!my-1.5 2xl:!my-2"></li>

					<ul>
						<li className="3xl:h-5 h-3 sm:h-4 xl:h-5 w-1/5 bg-MainDarkGray/60 rounded-sm !my-0.5 md:!my-1 lg:!my-1.5 2xl:!my-2"></li>
						<li className="3xl:h-5 h-3 sm:h-4 xl:h-5 w-1/12 bg-MainDarkGray/60 rounded-sm !my-0.5 md:!my-1 lg:!my-1.5 2xl:!my-2"></li>
						<li className="3xl:h-5 h-3 sm:h-4 xl:h-5 w-1/4 bg-MainDarkGray/60 rounded-sm !my-0.5 md:!my-1 lg:!my-1.5 2xl:!my-2"></li>
					</ul>

					<li className="3xl:h-5 h-3 sm:h-4 xl:h-5 w-1/12 bg-MainDarkGray/60 rounded-sm !my-0.5 md:!my-1 lg:!my-1.5 2xl:!my-2"></li>
				</ul>

				<div className="animate-pulse">
					<div className="3xl:h-5 h-3 sm:h-4 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-10/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-11/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					<div className="3xl:h-5 h-3 sm:h-4 w-5/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
				</div>
			</div>
		),
	});
}

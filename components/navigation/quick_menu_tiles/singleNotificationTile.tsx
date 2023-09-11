"use client";

import { Poppins } from "next/font/google";
import { useState } from "react";

const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

const poppingsFont300 = Poppins({
	weight: "300",
	subsets: ["latin"],
});

export default function SingleNotificationTile() {
	const [opened, setOpened] = useState(false);

	return (
		<div
			onClick={() => setOpened((old) => !old)}
			className={`text-white transition-all h-fit cursor-pointer duration-300 border-4 border-transparent p-1.5 sm:p-2 md:p-1.5 lg:p-2.5 3xl:p-3.5 rounded-2xl ${
				opened ? "bg-MainDarkGray/30 border-MainDarkGray/10" : "hover:border-MainDarkGray/10 hover:bg-MainDarkGray/30"
			}`}
		>
			<h1
				className={`line-clamp-1 transition-all text-xs md:text-xs lg:text-sm xl:text-base 3xl:line-clamp-2 3xl:text-lg sm:text-sm duration-300 ${
					opened ? "!line-clamp-none" : ""
				} ${poppingsFont600.className}`}
			>
				Lorem, ipsum sit amet dolores quods antuson.
			</h1>
			<p
				className={`relative after:text-white text-2xs md:text-2xs xl:text-sm sm:text-xs lg:text-xs 3xl:text-base line-clamp-3 3xl:line-clamp-4 4xl:line-clamp-5 transition-all duration-300 ${
					opened ? "!line-clamp-none" : ""
				} ${poppingsFont300.className}`}
			>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo inventore repudiandae possimus molestiae velit dolorem iste nostrum. Corporis sint ipsa rerum
				officiis sunt perspiciatis ad placeat, exercitationem veritatis velit facilis?
			</p>
		</div>
	);
}

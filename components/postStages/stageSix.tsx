"use client";

import Image from "next/image";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { useState } from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
	weight: "600",
	subsets: ["latin"],
});

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

export default function StageSix(props: { down: Function; up: Function; setEvent: Function; initEventId: string | null }) {
	const [eventId, seteventId] = useState(props.initEventId);

	function nextStage() {
		props.setEvent(eventId);
		props.up();
	}

	return (
		<div className="dashboard-post-page">
			<Image src="/newPost/Wave-1.svg" width="1920" height="1080" className="absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
			<div className="flex flex-col items-center gap-y-10 absolute top-1/2 max-w-xl -translate-y-1/2">
				<div className="flex flex-col gap-y-3">
					<h1 className={`text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-center ${poppingsFont700.className}`}>Połącz z wydarzeniem</h1>
					<p className={`text-center px-5 ext-xs xs:text-sm lg:text-base xl:text-xl 2xl:text-2xl ${poppingsFont400.className}`}>
						W tym momencie możesz połączyć ten post z istniejącym wydarzeniem
					</p>
				</div>

				<div className="w-full"></div>

				<div className="flex justify-between w-full">
					<button onClick={() => props.down()} className={`bg-MainDarkGray px-8 py-3 text-white rounded-3xl ${plusJakartaSans.className}`}>
						Powrót
					</button>
					<button onClick={() => nextStage()} className={`bg-MainColor px-8 py-3 text-white rounded-3xl ${plusJakartaSans.className}`}>
						Kontynuuj
					</button>
				</div>
			</div>
		</div>
	);
}

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

export default function StageOne(props: { down: Function; up: Function; setTitle: Function; initTitle: string }) {
	const [title, setTitle] = useState(props.initTitle);
	const [empty, setEmpty] = useState(false);

	function nextStage() {
		if (title.trim() == "") {
			setEmpty(true);
		} else {
			props.setTitle(title);
			props.up();
		}
	}

	return (
		<div className="dashboard-post-page">
			<Image src="/newPost/Wave-1.svg" width="1920" height="1080" className="absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
			<div className="flex flex-col items-center gap-y-10 absolute top-1/2 max-w-xl -translate-y-1/2">
				<div className="flex flex-col gap-y-3">
					<h1 className={`text-6xl text-center ${poppingsFont700.className}`}>Podaj tytuł</h1>
					<p className={`text-center px-5 text-lg ${poppingsFont400.className}`}>
						Wybierz idealny tytuł dla twojego postu. <br />
						Postaraj się, żeby był wyjątkowy!
					</p>
				</div>

				<div>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className={`border-2 border-MainGreen px-7 text-xl py-3.5 outline-none rounded-4xl ${poppingsFont600.className}`}
					/>
					<p className={`text-MainRed text-center h-4 mt-1 ${poppingsFont600.className}`}>{empty ? "Uzupełnij tytuj!" : ""} </p>
				</div>

				<div className="flex justify-between w-full">
					<button onClick={() => props.down()} className={`bg-MainDarkGray px-8 py-3 text-white rounded-3xl ${plusJakartaSans.className}`}>
						Powrót
					</button>
					<button onClick={() => nextStage()} className={`bg-MainGreen px-8 py-3 text-white rounded-3xl ${plusJakartaSans.className}`}>
						Kontynuuj
					</button>
				</div>
			</div>
		</div>
	);
}

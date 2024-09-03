"use client";

import Image from "next/image";
import { useState } from "react";

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
					<h1 className={`text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-center poppinsFont700`}>Podaj tytuł</h1>
					<p className={`text-center px-5 ext-xs xs:text-sm lg:text-base xl:text-xl 2xl:text-2xl poppinsFont400`}>
						Wybierz idealny tytuł dla twojego postu. <br />
						Postaraj się, żeby był wyjątkowy!
					</p>
				</div>

				<div className="w-full">
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className={`border-2 border-MainColor w-full px-7 text-xl py-3.5 outline-none rounded-4xl poppinsFont600`}
					/>
					<p className={`text-MainRed text-center h-4 mt-1 poppinsFont600`}>{empty ? "Uzupełnij tytuj!" : ""} </p>
				</div>

				<div className="flex justify-between w-full">
					<button onClick={() => props.down()} className={`bg-MainDarkGray px-8 py-3 text-white rounded-3xl plusJakartaSans600`}>
						Powrót
					</button>
					<button onClick={() => nextStage()} className={`bg-MainColor px-8 py-3 text-white rounded-3xl plusJakartaSans600`}>
						Kontynuuj
					</button>
				</div>
			</div>
		</div>
	);
}

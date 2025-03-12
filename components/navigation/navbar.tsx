"use client";
import { Accessibility } from "accessibility";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";

export default function Navbar() {
	const [sidebarVisible, setSidebarVisible] = useState(false);

	var labels = {
		resetTitle: "Resetuj",
		closeTitle: "Zamknij",
		menuTitle: "Opcje",
		increaseText: "Zwiększ rozmiar tekstu",
		decreaseText: "Zmniejsz rozmiar tekstu",
		increaseTextSpacing: "Większe odstępy",
		decreaseTextSpacing: "Mniejsze odstępy",
		increaseLineHeight: "Zwiększ wysokość linii",
		decreaseLineHeight: "Zmniejsz wysokość linii",
		invertColors: "Odwróć kolory",
		grayHues: "Odcienie szarości",
		underlineLinks: "Podkreśl linki",
		bigCursor: "Duży kursor",
		readingGuide: "Przewodnik do czytania",
		textToSpeech: "Tekst na mowę",
		speechToText: "Mowa na tekst",
		disableAnimations: "Wyłącz animacje",
		hotkeyPrefix: "Skrót klawiszowy:",
	};
	var options: any = {
		labels: labels,
		icon: {
			img: ["accessible"],
		},
	};

	useEffect(() => {
		new Accessibility(options);
	}, []);

	return (
		<>
			<nav className="top-0 bg-white z-20 sticky grid-cols-3 w-full items-center py-3 px-2 md:px-5 lg:px-12 grid 4xl:px-0">
				<Link href={"/"} className={`invisible md:visible justify-self-start text-xl 2xl:text-2xl tracking-widest poppinsFont700`}>
					II LO im. Romualda Traugutta
				</Link>

				<Link href={"/"} className="w-fit h-fit justify-self-center">
					<Image src={"/logo.png"} alt="Logo icon" className="3xl:w-32 -my-4" width={100} height={100} />
				</Link>

				<button onClick={() => setSidebarVisible((old) => !old)} className="w-fit h-fit justify-self-end">
					<Image src={"/Hamburger.svg"} alt="Hamburger button" className="3xl:w-10" width={30} height={30} />
				</button>
			</nav>

			<Sidebar visible={sidebarVisible} toggle={() => setSidebarVisible((old) => !old)} />

			{sidebarVisible ? <div onClick={() => setSidebarVisible(false)} className="w-full absolute top-0 left-0 z-30 h-screen"></div> : <></>}
		</>
	);
}

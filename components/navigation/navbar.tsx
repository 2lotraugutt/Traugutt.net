"use client";

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { useState } from "react";
import Sidebar from "./sidebar";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Navbar() {
	const [sidebarVisible, setSidebarVisible] = useState(false);

	return (
		<>
			<nav className="top-0 bg-white z-20 sticky grid-cols-3 w-full items-center py-3 px-2 md:px-5 lg:px-12 grid 4xl:px-0">
				<Link href={"/"} className={`invisible md:visible justify-self-start text-xl 2xl:text-2xl tracking-widest ${poppingsFont700.className}`}>
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

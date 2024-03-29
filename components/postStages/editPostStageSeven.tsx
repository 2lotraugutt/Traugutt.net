"use client";

import Image from "next/image";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const plusJakartaSans800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

const plusJakartaSans600 = Plus_Jakarta_Sans({
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

export default function EditPostStageSeven(props: { down: Function; upload: Function; uploaded: boolean }) {
	const [seconds, setSeconds] = useState(10);

	const router = useRouter();
	useEffect(() => {
		if (props.uploaded == true) {
			setTimeout(() => {
				countDown();
			}, 1000);
		}
		function countDown() {
			if (seconds > 1) {
				setTimeout(() => {
					setSeconds((prev) => prev - 1);
					countDown();
				}, 1000);
			} else router.push("/");
		}
	}, [props.uploaded, router, seconds]);

	return (
		<div className="dashboard-post-page">
			<Image src="/newPost/Wave-6.svg" width="1920" height="1080" className="absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
			<div className="flex flex-col items-center gap-y-10 absolute top-1/2 max-w-xl -translate-y-1/2">
				<div className="flex flex-col gap-y-3">
					<h1 className={`text-6xl text-center ${poppingsFont700.className}`}>Publikacja zmian</h1>
					<p className={`text-center px-5 text-lg ${poppingsFont400.className}`}>
						Nareszcie nastał ten wyczekiwany moment.
						<br />
						<b className={`text-SecondColor ${poppingsFont600.className}`}>Możesz opublikować wszystkie zmiany w twoim poście.</b> Cieszymy się, że dopracowałeś
						swoje dzieło!
					</p>
				</div>

				<button
					disabled={props.uploaded}
					onClick={() => props.upload()}
					className={`bg-MainColor text-2xl px-20 my-5 py-3 text-white rounded-3xl ${plusJakartaSans800.className}`}
				>
					{props.uploaded ? "Opublikowano!" : "Opublikuj!"}
				</button>

				<p className={`text-center -mt-10 px-5 text-sm ${props.uploaded ? "" : "hidden"} ${poppingsFont400.className}`}>
					Zostaniesz przekierowany za {seconds} sekund.{" "}
					<Link href={"/"} className={`hover:text-SecondColor ${plusJakartaSans600.className}`}>
						Przekieruj mnie.
					</Link>
				</p>

				<div className="flex flex-col gap-y-6 justify-between w-full">
					<p className={`text-center px-5 text-sm ${props.uploaded ? "" : "hidden"} ${poppingsFont400.className}`}>
						Ze względu na wprowadzone zmiany twój post został ustawiony na prywatny. <br />
						Daj nam chwilę na sprawdzenie czy wszystko gra. Twoim postem zajmiemy się priorytetowo!
					</p>
					<button
						onClick={() => props.down()}
						className={`bg-MainDarkGray w-fit px-8 py-3 text-white rounded-3xl ${props.uploaded ? "hidden" : ""} ${plusJakartaSans600.className}`}
					>
						Powrót
					</button>
				</div>
			</div>
		</div>
	);
}

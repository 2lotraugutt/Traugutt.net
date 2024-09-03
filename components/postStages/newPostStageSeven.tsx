"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewPostStageSeven(props: { down: Function; upload: Function; uploaded: boolean }) {
	const [seconds, setSeconds] = useState(10);

	const router = useRouter();

	useEffect(() => {
		if (props.uploaded == true) {
			if (seconds > 0) {
				setTimeout(() => {
					setSeconds((prev) => prev - 1);
				}, 1000);
			} else router.push("/");
		}
	}, [seconds, props.uploaded, router]);

	return (
		<div className="dashboard-post-page">
			<Image src="/newPost/Wave-6.svg" width="1920" height="1080" className="absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
			<div className="flex flex-col items-center gap-y-10 absolute top-1/2 max-w-xl -translate-y-1/2">
				<div className="flex flex-col gap-y-3">
					<h1 className={`text-6xl text-center poppinsFont700`}>Publikacja</h1>
					<p className={`text-center px-5 text-lg poppinsFont400`}>
						Nareszcie nastał ten wyczekiwany moment.
						<br />
						<b className={`text-SecondColor poppinsFont600`}>Możesz opublikować swój post!</b> To najwaniejszy element jego podrózy. Ten, na którego czekaliśmy tak
						bardzo!
					</p>
				</div>

				<button disabled={props.uploaded} onClick={() => props.upload()} className={`bg-MainColor text-2xl px-20 my-5 py-3 text-white rounded-3xl plusJakartaSans800`}>
					{props.uploaded ? "Opublikowano!" : "Opublikuj!"}
				</button>

				<p className={`text-center -mt-10 px-5 text-sm ${props.uploaded ? "" : "hidden"} poppinsFont400`}>
					Zostaniesz przekierowany za {seconds} sekund.
					<Link href={"/"} className={`hover:text-SecondColor plusJakartaSans600`}>
						Przekieruj mnie.
					</Link>
				</p>

				<div className="flex flex-col gap-y-6 justify-between w-full">
					<p className={`text-center px-5 text-sm ${props.uploaded ? "" : "hidden"} poppinsFont400`}>
						Daj nam chwile na zweryfikowanie posta. <br /> Post powinien pojawić się na stronie maksymalnie po kilku dniach.
					</p>
					<button
						onClick={() => props.down()}
						className={`bg-MainDarkGray w-fit px-8 py-3 text-white rounded-3xl ${props.uploaded ? "hidden" : ""} plusJakartaSans600`}
					>
						Powrót
					</button>
				</div>
			</div>
		</div>
	);
}

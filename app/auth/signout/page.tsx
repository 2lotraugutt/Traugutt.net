"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function Page() {
	const { data: session, status } = useSession();
	const { push } = useRouter();

	if (status == "unauthenticated") push("/");

	return (
		<div className="w-screen top-0 left-0 z-20 absolute h-screen bg-white">
			<div className="w-full h-full absolute">
				<Image src="/Blob.svg" width="500" height="500" className="hidden xl:block absolute w-fit h-3/4 xl:left-32 2xl:left-72 top-1/2 -translate-y-1/2" alt="" />

				<Image src="/Wave-2.svg" width="1920" height="1080" className="xl:hidden absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
				<Image src="/Wave.svg" width="1920" height="1080" className="hidden xl:block absolute top-0 left-0 w-full h-full object-left object-cover" alt="" />
			</div>

			<div className="right-0 h-full absolute w-full xl:w-fit 3xl:w-2/5 flex items-center justify-center xl:px-12 2xl:px-20">
				<div className="p-4 md:p-20 text-center items-center flex flex-col gap-6 pb-12 md:pb-40 xl:gap-y-8 lg:pb-32">
					<Image src="/Glasses.svg" width="250" height="100" alt="Glasses icon" />

					<h1 className={`text-3xl sm:text-5xl xl:text-6xl ${poppingsFont700.className}`}>Sign out</h1>
					<h2 className={`text-base sm:text-lg -mt-3 xl:text-xl ${poppingsFont500.className}`}>Are you sure you want to sign out?</h2>

					<button
						onClick={() => signOut({ callbackUrl: "/" })}
						className={`flex items-center sm:text-xl text-white bg-MainDarkGray transition-all duration-300 rounded-full border-4 border-MainDarkGray hover:border-white/60 hover:bg-MainGreen px-10 py-2.5 ${poppingsFont700.className}`}
					>
						Sign out
					</button>
				</div>
			</div>
		</div>
	);
}

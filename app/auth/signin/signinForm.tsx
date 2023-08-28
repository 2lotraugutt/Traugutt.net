"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Poppins } from "next/font/google";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function SigninForm(props: { redirect: string }) {
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

					<h1 className={`text-3xl sm:text-5xl xl:text-6xl ${poppingsFont700.className}`}>Zaloguj się</h1>
					<h2 className={`text-base sm:text-lg -mt-3 xl:text-xl ${poppingsFont500.className}`}>Miło nam widzieć cię ponownie!</h2>

					<div className="flex flex-col gap-y-1 sm:gap-y-2 2xl:gap-y-3">
						<button onClick={() => signIn("google", { callbackUrl: props.redirect })} className={`login-button ${poppingsFont700.className}`}>
							<FontAwesomeIcon icon={faGoogle} className="me-5 md:text-4xl text-2xl w-6 md:w-9" />
							Zaloguj się z Google
						</button>
						<button onClick={() => signIn("facebook", { callbackUrl: props.redirect })} className={`login-button ${poppingsFont700.className}`}>
							<FontAwesomeIcon icon={faFacebook} className="me-5 md:text-4xl text-2xl w-6 md:w-9" />
							Zaloguj się z Facebook
						</button>
						<button onClick={() => signIn("discord", { callbackUrl: props.redirect })} className={`login-button ${poppingsFont700.className}`}>
							<FontAwesomeIcon icon={faDiscord} className="me-5 md:text-4xl text-2xl w-6 h-6 md:h-9 md:w-9" />
							Zaloguj się z Discord
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

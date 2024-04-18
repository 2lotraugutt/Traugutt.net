import { faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});
const plusJakartaSansFont700 = Plus_Jakarta_Sans({
	weight: "700",
	subsets: ["latin"],
});
export default function Footer() {
	return (
		<footer className="bg-MainDarkGray text-white rounded-3xl flex gap-y-10 flex-col md:flex-row px-6 md:px-8 lg:px-10 lg:mx-12 mx-2 md:mx-5 4xl:mx-0 mb-2 md:mb-3 2xl:mb-4 4xl:mb-5 py-12 mt-10 sm:mt-12 3xl:mt-24 lg:mt-16 2xl:mt-20 md:mt-14">
			<div className="w-full flex flex-col items-center justify-center md:gap-y-1 xl:gap-y-2 3xl:gap-y-3">
				<Image src="/logo.png" width="125" className="!text-white scale-75 sm:scale-90 xl:scale-100 md:scale-95" height="125" alt="Logo icon" />
				<p className={`text-lg xl:text-xl 3xl:text-2xl ${poppingsFont700.className}`}>II LO. TRAUGUTT</p>
			</div>

			<div
				className={`w-full flex flex-col items-center justify-center text-center text-sm xl:text-lg md:text-base 3xl:text-xl gap-y-4 ${plusJakartaSansFont700.className}`}
			>
				<p>tel. 34-361-25-68</p>
				<div>
					<Link href={"mailto:lo2@edukacja.czestochowa.pl"} className="hover:text-MainColor transition">
						lo2@edukacja.czestochowa.pl
					</Link>
					<br />
					<Link href={"mailto:dyrektor@traugutt.net"} className="hover:text-MainColor transition">
						dyrektor@traugutt.net
					</Link>
				</div>
			</div>

			<div className="w-full flex items-center justify-center gap-x-4">
				<Link href={"https://www.facebook.com/trauguttnet"}>
					<FontAwesomeIcon
						icon={faFacebook}
						className="h-5 lg:w-7 w-5 lg:h-7 p-2.5 lg:p-3 2xl:p-3.5 2xl:w-10 2xl:h-10 border-2 rounded-full hover:border-4 transition-all duration-300 hover:border-MainColor"
					/>
				</Link>
				<Link href={"https://www.instagram.com/2lotraugutt/"}>
					<FontAwesomeIcon
						icon={faInstagram}
						className="h-5 lg:w-7 w-5 lg:h-7 p-2.5 lg:p-3 2xl:p-3.5 2xl:w-10 2xl:h-10 border-2 rounded-full hover:border-4 transition-all duration-300 hover:border-MainColor"
					/>
				</Link>
				<Link href={"https://www.tiktok.com/@traugutt_czestochowa"}>
					<FontAwesomeIcon
						icon={faTiktok}
						className="h-5 lg:w-7 w-5 lg:h-7 p-2.5 lg:p-3 2xl:p-3.5 2xl:w-10 2xl:h-10 border-2 rounded-full hover:border-4 transition-all duration-300 hover:border-MainColor"
					/>
				</Link>
			</div>
		</footer>
	);
}

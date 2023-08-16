import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppingsFont = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Navbar() {
	return (
		<nav className="top-0 bg-white z-20 sticky grid-cols-3 w-full items-center py-3 px-50px grid">
			<Link href={"/"} className={`justify-self-start text-xl tracking-widest ${poppingsFont.className}`}>
				II LO. TRAUGUTT
			</Link>

			<Link href={"/"} className="w-fit h-fit justify-self-center">
				<Image src={"/Glasses.svg"} alt="Glasses icon" width={150} height={1000} />
			</Link>

			<button className="w-fit h-fit justify-self-end">
				<Image src={"/Hamburger.svg"} alt="Hamburger button" width={30} height={30} />
			</button>
		</nav>
	);
}

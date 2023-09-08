import { Poppins } from "next/font/google";

const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

const poppingsFont400 = Poppins({
	weight: "400",
	subsets: ["latin"],
});

export default function NotificationssTile() {
	return (
		<div className="rounded-3xl md:col-span-1 p-5 row-span-2 xs:rounded-4xl bg-PurplePattern bg-cover bg-center">
			<div className="text-white group cursor-default duration-300 hover:bg-MainDarkGray/30 border-4 border-transparent hover:border-MainDarkGray/10 p-3 rounded-2xl">
				<h1 className={"line-clamp-1 " + poppingsFont600.className}>Lorem, ipsum.</h1>
				<p className={`relative after:text-white text-sm line-clamp-3 ${poppingsFont400.className}`}>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo inventore repudiandae possimus molestiae velit dolorem iste nostrum. Corporis sint ipsa rerum
					officiis sunt perspiciatis ad placeat, exercitationem veritatis velit facilis?
				</p>
			</div>

			<div className="text-white group cursor-default duration-300 hover:bg-MainDarkGray/30 border-4 border-transparent hover:border-MainDarkGray/10 p-3 rounded-2xl">
				<h1 className={"line-clamp-1 " + poppingsFont600.className}>Lorem, ipsum.</h1>
				<p className={`relative after:text-white text-sm line-clamp-3 ${poppingsFont400.className}`}>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo inventore repudiandae possimus molestiae velit dolorem iste nostrum. Corporis sint ipsa rerum
					officiis sunt perspiciatis ad placeat, exercitationem veritatis velit facilis?
				</p>
			</div>
		</div>
	);
}

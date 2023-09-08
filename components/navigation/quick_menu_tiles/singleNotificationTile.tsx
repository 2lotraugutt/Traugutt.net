import { Poppins } from "next/font/google";

const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

const poppingsFont300 = Poppins({
	weight: "300",
	subsets: ["latin"],
});

export default function SingleNotificationTile() {
	return (
		<div className="text-white group cursor-default duration-300 hover:bg-MainDarkGray/30 border-4 border-transparent hover:border-MainDarkGray/10 p-2.5 rounded-2xl">
			<h1 className={"line-clamp-1 " + poppingsFont600.className}>Lorem, ipsum.</h1>
			<p className={`relative after:text-white text-sm line-clamp-3 ${poppingsFont300.className}`}>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo inventore repudiandae possimus molestiae velit dolorem iste nostrum. Corporis sint ipsa rerum
				officiis sunt perspiciatis ad placeat, exercitationem veritatis velit facilis?
			</p>
		</div>
	);
}

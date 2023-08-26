import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default async function Page() {
	const session = (await getServerSession(authOptions)) as SessionDataType;
	const userRole = session.user.role;

	const yourPostsVisible = userRole != "USER";
	const postsVisible = userRole == "TEACHER" || userRole == "ADMIN" || userRole == "EDITOR";
	const eventsVisible = userRole == "TEACHER" || userRole == "ADMIN" || userRole == "MANAGER";
	const usersVisible = userRole == "TEACHER" || userRole == "ADMIN" || userRole == "MANAGER";

	return (
		<div className="flex flex-col gap-y-10 sm:gap-y-12 py-40 3xl:gap-y-24 lg:gap-y-16 2xl:gap-y-20 md:gap-y-14 lg:px-12 px-2 md:px-5 4xl:px-0 bg-LightGray/30 border-y-2 border-LightGray/70">
			<h1 className={`text-MainDarkGray text-center text-6xl ${poppingsFont700.className}`}>Panel sterowania</h1>
		</div>
	);
}

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
		<div className="dashboard-page">
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Panel sterowania</h1>
		</div>
	);
}

import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import { authOptions } from "../api/auth/[...nextauth]/route";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default async function Page() {
	// const session = (await getServerSession(authOptions)) as SessionDataType;

	return (
		<div className="dashboard-page">
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Panel sterowania</h1>
		</div>
	);
}

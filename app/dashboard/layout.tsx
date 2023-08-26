import DashboardNavbar from "@/components/dashboard/dashboardNavbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session)
		return (
			<>
				<DashboardNavbar session={session} />
				{children}
			</>
		);
}

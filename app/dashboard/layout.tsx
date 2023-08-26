import DashboardNavbar from "@/components/dashboard/dashboardNavbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SigninForm from "../auth/signin/signinForm";


export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session)
		return (
			<>
				<DashboardNavbar session={session} />
				{children}
			</>
		);
	else {
		return <SigninForm redirect="/dashboard" />;
	}
}

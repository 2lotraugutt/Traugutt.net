import DashboardNavbar from "@/components/dashboard/dashboardNavbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<DashboardNavbar />
			{children}
		</>
	);
}

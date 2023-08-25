import DashboardNavbar from "@/components/navigation/dashboardNavbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<DashboardNavbar />
			{children}
		</>
	);
}

import Navbar from "@/components/navigation/navbar";
import "./globals.css";

export const metadata = {
	title: "Traugutt",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}

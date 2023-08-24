import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import "./globals.css";

export const metadata = {
	title: "Traugutt",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="max-w-screen-4xl mx-auto">
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import "./globals.css";
import AuthProvider from "@/lib/authProvider";
import "@/lib/generateNumbers";

export const metadata = {
	title: "Traugutt",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className="max-w-screen-4xl mx-auto text-MainDarkGray">
					<Navbar />
					<div>{children}</div>
					<Footer />
				</body>
			</AuthProvider>
		</html>
	);
}

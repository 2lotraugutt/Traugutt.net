import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import "./globals.css";
import AuthProvider from "@/lib/authProvider";

export const metadata = {
	title: "Traugutt",
};

export default function RootLayout({ children, props }: { children: React.ReactNode; props: any }) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className="max-w-screen-4xl mx-auto">
					<Navbar />
					{props}
					{children}
					<Footer />
				</body>
			</AuthProvider>
		</html>
	);
}

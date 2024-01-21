import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import "./globals.css";
import AuthProvider from "@/lib/authProvider";
import "@/lib/generateNumbers";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Traugutt",
	description: "II Liceum Ogólnokształcące im. Romualda Traugutta w Częstochowie.",
	keywords:
		"II LO Traugutt, 2 LO Traugutt, Traugutt, Traugutt Częstochowa, Romuald Traugutt, Liceum Ogólnokształcące im. Romualda Traugutta, Edukacja, Nauka, Doskonałość Akademicka, Uczniowie, Program Nauczania, Działalność Pozalekcyjna, Wydarzenia Szkolne, Kadra Nauczycielska, Rekrutacja",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pl">
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

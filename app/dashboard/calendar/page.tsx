import { Poppins } from "next/font/google";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Page() {
	return (
		<div className="dashboard-page">
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Wydarzenia</h1>
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Kalendarz</h1>
		</div>
	);
}

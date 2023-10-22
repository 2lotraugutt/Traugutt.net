import { Poppins } from "next/font/google";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function LoadingLayout() {
	return (
		<div className="dashboard-page">
			<h1 className={`dashboard-heading h-screen ${poppingsFont700.className}`}>Ładowanie...</h1>
		</div>
	);
}

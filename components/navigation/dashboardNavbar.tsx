"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";

const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

export default function DashboardNavbar() {
	const pathname = usePathname();

	return (
		<div className={`flex gap-x-2 flex-row lg:px-12 px-2 md:px-5 4xl:px-0 py-2 ${poppingsFont600.className}`}>
			<Link href={"/dashboard/posts"} className={`dashboard-link ${pathname == "/dashboard/posts" ? "active-dashboard-link" : ""}`}>
				Posty
			</Link>

			<Link href={"/dashboard/events"} className={`dashboard-link ${pathname == "/dashboard/events" ? "active-dashboard-link" : ""}`}>
				Wydarzenia
			</Link>
			<Link href={"/dashboard/users"} className={`dashboard-link ${pathname == "/dashboard/users" ? "active-dashboard-link" : ""}`}>
				Użytkownicy
			</Link>
			<Link href={"/dashboard/account"} className={`dashboard-link ${pathname == "/dashboard/account" ? "active-dashboard-link" : ""}`}>
				Konto
			</Link>
		</div>
	);
}

"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

export default function DashboardNavbar() {
	const [userSession, setSession] = useState<SessionDataType>();

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType;

			if (session) {
				setSession(session);
			}
		}
		initFunction();
	}, []);

	const pathname = usePathname();

	if (userSession) {
		const userRole = userSession.user.role;

		const yourPostsVisible = userRole != "USER";
		const postsVisible = userRole == "TEACHER" || userRole == "ADMIN" || userRole == "EDITOR";
		const eventsVisible = userRole == "TEACHER" || userRole == "ADMIN" || userRole == "MANAGER";
		const usersVisible = userRole == "TEACHER" || userRole == "ADMIN" || userRole == "MANAGER";

		return (
			<div className={`flex fixed w-full border-b-2 bg-white gap-x-2 flex-row lg:px-12 px-2 md:px-5 4xl:px-0 py-2 ${poppingsFont600.className}`}>
				<Link href={"/dashboard"} className={`dashboard-link ${pathname == "/dashboard" ? "active-dashboard-link" : ""}`}>
					Panel sterowania
				</Link>

				<Link
					href={"/dashboard/personal-posts"}
					className={`${yourPostsVisible ? "" : "hidden"} dashboard-link ${pathname == "/dashboard/personal-posts" ? "active-dashboard-link" : ""}`}
				>
					Twoje posty
				</Link>

				<Link href={"/dashboard/posts"} className={`${postsVisible ? "" : "hidden"} dashboard-link ${pathname == "/dashboard/posts" ? "active-dashboard-link" : ""}`}>
					Posty
				</Link>

				<Link
					href={"/dashboard/events"}
					className={`${eventsVisible ? "" : "hidden"} dashboard-link ${pathname == "/dashboard/events" ? "active-dashboard-link" : ""}`}
				>
					Wydarzenia
				</Link>

				<Link href={"/dashboard/users"} className={`${usersVisible ? "" : "hidden"} dashboard-link ${pathname == "/dashboard/users" ? "active-dashboard-link" : ""}`}>
					Użytkownicy
				</Link>

				<Link href={"/dashboard/account"} className={`dashboard-link ${pathname == "/dashboard/account" ? "active-dashboard-link" : ""}`}>
					Konto
				</Link>
			</div>
		);
	}
}

"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";

const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

export default function DashboardNavbar(props: { session: SessionDataType }) {
	const pathname = usePathname();

	const userRole = props.session.user.role;

	return (
		<div className="w-screen bg-white z-20 h-fit fixed border-b-2 left-0 lg:px-12 px-2 md:px-5 4xl:px-0">
			<div className={`flex overflow-x-auto mx-auto w-full gap-x-1 sm:gap-x-2 flex-row max-w-screen-4xl ${poppingsFont600.className}`}>
				<Link href={"/dashboard"} className={`dashboard-link ${pathname == "/dashboard" ? "active-dashboard-link" : ""}`}>
					Panel sterowania
				</Link>

				<Link
					href={"/dashboard/post"}
					className={`${userRole.createPosts ? "" : "hidden"} dashboard-link ${pathname == "/dashboard/post" ? "active-dashboard-link" : ""}`}
				>
					Nowy post
				</Link>

				<Link
					href={"/dashboard/personal-posts"}
					className={`${userRole.createPosts ? "" : "hidden"} dashboard-link ${pathname == "/dashboard/personal-posts" ? "active-dashboard-link" : ""}`}
				>
					Twoje posty
				</Link>

				<Link
					href={"/dashboard/posts"}
					className={`${userRole.managePosts || userRole.publishPosts ? "" : "hidden"} dashboard-link ${
						pathname == "/dashboard/posts" ? "active-dashboard-link" : ""
					}`}
				>
					Posty
				</Link>

				<Link
					href={"/dashboard/notifications"}
					className={`${userRole.manageNotifications ? "" : "hidden"} dashboard-link ${pathname == "/dashboard/notifications" ? "active-dashboard-link" : ""}`}
				>
					Wiadomości
				</Link>

				<Link
					href={"/dashboard/calendar"}
					className={`${userRole.manageEvents || userRole.manageCalendar ? "" : "hidden"} dashboard-link ${
						pathname == "/dashboard/calendar" ? "active-dashboard-link" : ""
					}`}
				>
					Kalendarz
				</Link>

				<Link
					href={"/dashboard/users"}
					className={`${userRole.manageUsers ? "" : "hidden"} dashboard-link ${pathname == "/dashboard/users" ? "active-dashboard-link" : ""}`}
				>
					Użytkownicy
				</Link>

				<Link href={"/dashboard/account"} className={`dashboard-link ${pathname == "/dashboard/account" ? "active-dashboard-link" : ""}`}>
					Konto
				</Link>
			</div>
		</div>
	);
}

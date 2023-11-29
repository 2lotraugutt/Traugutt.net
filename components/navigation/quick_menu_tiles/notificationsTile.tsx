"use client";

import { useEffect, useState } from "react";
import SingleNotificationTile from "./singleNotificationTile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function NotificationssTile() {
	const [notifications, setNotifications] = useState<NotificationDataType[]>([]);
	const [session, setSession] = useState<SessionDataType>();

	useEffect(() => {
		setupFunction();
		async function setupFunction() {
			const notifications = await (await fetch(`api/notifications?count=25`)).json();
			const newSession = (await getSession()) as SessionDataType | undefined;
			if (newSession) setSession(newSession);

			setNotifications(notifications);
		}
	}, []);
	const router = useRouter();

	return (
		<div className="md:col-span-1 row-span-2 flex flex-col gap-y-3">
			<div className="rounded-3xl relative xs:rounded-4xl h-full bg-SecondColor bg-cover bg-center">
				<div className="hide-scrollbar absolute whitespace-pre-wrap flex flex-col gap-0.5 lg:gap-1 left-0 right-0 top-0 bottom-0 overflow-y-auto p-2 xs:p-3 sm:p-4 md:p-2 lg:p-3.5 xl:p-5 3xl:p-7 4xl:p-9">
					{notifications.map((notification, i) => (
						<SingleNotificationTile notification={notification} key={i} />
					))}
				</div>
			</div>

			{session && session.user.changeName && (
				<div
					onClick={() => router.push("./dashboard/account")}
					className="rounded-3xl cursor-pointer flex gap-x-3 items-center xs:rounded-4xl relative bg-MainColor bg-cover bg-center p-2 xs:p-2.5 sm:p-3.5 md:p-2 lg:p-3 xl:p-4 3xl:p-5 4xl:p-7"
				>
					<FontAwesomeIcon
						icon={faTriangleExclamation}
						className="text-MainDarkGray aspect-square bg-white h-6 w-6 2xl:w-7 2xl:h-7 3xl:w-10 2xl:p-3 4xl:p-4 3xl:h-10 4xl:w-10 4xl:h-10 p-2 rounded-full"
					/>
					<p className="text-xs md:text-xs lg:text-sm xl:text-base 3xl:text-lg sm:text-sm">Zmień nazwę użytkownika!</p>
				</div>
			)}
		</div>
	);
}

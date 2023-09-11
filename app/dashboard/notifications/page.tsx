import { getSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Page() {
	const router = useRouter();

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (!session.user.role.manageNotifications) router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, []);

	return (
		<div className="dashboard-page">
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Wiadomości</h1>

			<div>
				<h1>Dodaj wiadomość</h1>
			</div>
		</div>
	);
}

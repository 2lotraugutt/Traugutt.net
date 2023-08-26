import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SigninForm from "./signinForm";

export default function Page() {
	const { data: session, status } = useSession();
	const { push } = useRouter();

	if (status == "authenticated") push("/");

	return <SigninForm redirect="/" />;
}

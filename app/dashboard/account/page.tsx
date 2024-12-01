"use client";
import LoadingLayout from "@/app/dashboard/loadingLayout";
import { faCheck, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [accountData, setAccountData] = useState<UserDataType>();

  const router = useRouter();
  useEffect(() => {
    async function initFunction() {
      const session = (await getSession()) as SessionDataType | undefined;

      if (session) fetchAcountData();
      else router.push("/");
    }
    initFunction();
  }, [router]);

  async function fetchAcountData() {
    const returnedData = (await (await fetch(`/api/dashboard/account`)).json()) as UserDataType;
    setAccountData(returnedData);
  }

  if (accountData)
    return (
      <div className="dashboard-page  max-w-3xl lg:max-w-5xl mx-auto">
        <h1 className={`dashboard-heading poppinsFont700`}>Konto</h1>

        <div className="flex flex-col lg:flex-row gap-y-5 items-center gap-x-7">
          <Image src={accountData.image} className="h-20 w-20 rounded-full" height={96} width={96} alt="Account image" />

          <p className={`rounded-lg px-5 py-1.5 bg-LightGray/20 text-sm xs:text-lg sm:text-xl xl:text-2xl poppinsFont700`}>{accountData.name}</p>
        </div>

        <div className="flex flex-col gap-y-6 sm:gap-y-8 lg:gap-y-10">
          <div className="flex flex-col">
            <p className={`text-xs sm:text-sm xl:text-base poppinsFont500`}>Login:</p>
            <p className={`text-base sm:text-lg xl:text-xl poppinsFont700`}>{accountData.login}</p>
          </div>
          <div className="flex flex-col">
            <p className={`text-xs sm:text-sm xl:text-base poppinsFont500`}>Email:</p>
            <p className={`text-base sm:text-lg xl:text-xl poppinsFont700`}>{accountData.email}</p>
          </div>
          <div className="flex flex-col">
            <p className={`text-xs sm:text-sm xl:text-base poppinsFont500`}>Typ użytkownika:</p>
            <p className={`text-base sm:text-lg xl:text-xl poppinsFont700`}>{accountData.role.name}</p>
          </div>
        </div>
        <button onClick={() => signOut({ callbackUrl: "/" })} className={`group/button dashboard-post-tile plusJakartaSans700`}>
          Wyloguj się
          <div className="dashboard-post-tile-icon">
            <FontAwesomeIcon icon={faSignOut} />
          </div>
        </button>
      </div>
    );
  else return <LoadingLayout />;
}

"use client";
import { useEffect, useState } from "react";

type DeviceType = "critical" | "normal" | "optional";

interface Device {
	rtt: number;
	last_seen: number;
	last_seen_d: number;
	type: DeviceType;
}

interface Location {
	[device: string]: Device;
}

interface networkStatusDataType {
	[location: string]: Location | undefined;
}

export default function Page() {
	const [networkStatus, setNetworkStatus] = useState<networkStatusDataType>({});

	useEffect(() => {
		fetchNCM();
	}, []);

	async function fetchNCM() {
		const fetchedData = await(await fetch("/api/ncm", { cache: "no-store" })).json();
		setNetworkStatus(fetchedData);
		setTimeout(() => fetchNCM(), 1000);
	}

	function formatUnixTimestamp(unixTimestamp: number): string {
		const date = new Date(unixTimestamp * 1000);
		const now = new Date();

		// Compare the year, month, and date
		const isSameDay = date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();

		// Options for time and date formatting
		const timeOptions: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
		const dateOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };

		if (isSameDay) {
			// Format time only
			return "Last seen: " + date.toLocaleTimeString([], timeOptions);
		} else {
			// Format date and time
			return `${date.toLocaleTimeString([], timeOptions)} ${date.toLocaleDateString([], dateOptions)}`;
		}
	}

	return (
		<div className={`w-full grid gap-y-5 3xl:grid-flow-col grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 lg:grid-cols-4 3xl:auto-cols-fr`}>
			{Object.entries(networkStatus).map(
				([locationName, devices], i) =>
					locationName != "" &&
					devices && (
						<div key={i} className={`px-1.5 sm:px-2`}>
							<h3 className={`ms-1 text-base xs:text-lg sm:text-xl 2xl:text-lg text-center 4xl:text-xl poppinsFont700 mb-3`}>{locationName}</h3>
							<div className="flex flex-col gap-y-1.5 sm:gap-2 md:gap-3">
								{Object.entries(devices).map(([deviceName, deviceData], j) => {
									if (deviceData.type == "optional" && deviceData.last_seen_d > 300) return null;
									else
										return (
											<div
												key={j}
												className={`flex justify-center flex-col items-center w-full p-1 rounded-lg 
												${deviceData.rtt > 3000 && "border-yellow-400"} 
												${deviceData.last_seen_d <= 1 ? "border-[#1fd15d]" : deviceData.last_seen_d < 7 ? "border-orange-400" : "border-MainRed"} 
												${deviceData.type == "critical" ? "border-[2.5px]" : "border-2"} 
												${deviceData.type == "critical" && deviceData.rtt > 3000 && "bg-[#FFFFC2]"} 
												${deviceData.type == "critical" && deviceData.last_seen_d > 5 && "bg-LightRed"}
												`}
											>
												<p className="plusJakartaSans500 text-sm md:text-base">{deviceName}</p>
												<p className="text-MainDarkGray/70 text-xs md:text-sm xl:text-base ">
													{deviceData.last_seen_d <= 1 ? (
														<> {deviceData.rtt / 1000}ms </>
													) : deviceData.last_seen_d < 180 ? (
														<>Last seen: {deviceData.last_seen_d}</>
													) : (
														formatUnixTimestamp(deviceData.last_seen)
													)}
												</p>
											</div>
										);
								})}
							</div>
						</div>
					)
			)}
		</div>
	);
}

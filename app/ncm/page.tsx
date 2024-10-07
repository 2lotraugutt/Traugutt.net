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
		try {
			const response = await fetch("/api/ncm");

			// Check if the response is not empty or invalid
			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.statusText}`);
			}

			const fetchedData = await response.json();

			// Check if fetchedData is a valid object or array
			if (!fetchedData) {
				throw new Error("Received empty JSON data");
			}

			setNetworkStatus(fetchedData);
		} catch (error) {
			console.error("Failed to fetch NCM data:", error);
		} finally {
			// Fetch the data again after 1 second
			setTimeout(() => fetchNCM(), 1000);
		}
	}

	return (
		<div className={`w-full grid gap-y-5 3xl:grid-flow-col grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 lg:grid-cols-4 3xl:auto-cols-fr`}>
			{Object.entries(networkStatus).map(
				([locationName, devices]) =>
					locationName != "" &&
					devices && (
						<div className={`px-2`}>
							<h3 className={`ms-1 text-md xs:text-lg sm:text-xl 2xl:text-lg text-center 4xl:text-xl poppinsFont700 mb-3`}>{locationName}</h3>
							<div className=" flex flex-col gap-y-3">
								{Object.entries(devices).map(([deviceName, deviceData]) => {
									return (
										<div
											className={`flex justify-center flex-col items-center w-full rounded-lg
												${deviceData.last_seen_d == 0 ? "border-[#1fd15d]" : deviceData.last_seen_d < 5 ? "border-orange-400" : "border-MainRed"}
												${deviceData.type == "critical" ? "border-[2.5px]" : "border-2"}
												${deviceData.type == "critical" && deviceData.last_seen_d > 5 && "bg-LightRed"}`}
										>
											<p className="plusJakartaSans500">{deviceName}</p>
											<p className="text-MainDarkGray/70">
												{deviceData.last_seen_d == 0 ? <> {deviceData.rtt / 1000}ms </> : <>Last seen: {deviceData.last_seen_d}s</>}
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

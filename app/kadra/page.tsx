"use client";
import { TeacherDataType } from "@/global";
import { useEffect, useState } from "react";
import TeacherCard from "./teacherCard";

export default function TeacherSection() {
	const [teachersData, setTeachersData] = useState<TeacherDataType[]>([]);

	useEffect(() => {
		setupFunction();
		async function setupFunction() {
			const fetchedData = await (await fetch(`api/teachers`)).json();

			setTeachersData(fetchedData);
		}
	}, []);
	return (
		<div className="px-4 sm:px-8 lg:px-12 xl:px-24 py-6 sm:py-8 lg:py-12">
			<h1 className="text-MainDarkGray text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold poppinsFont700 mb-16">Kadra</h1>

			<div className="grid gap-10 sm:gap-12 md:gap-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{teachersData.length != 0
					? teachersData.map((teacher: TeacherDataType) => <TeacherCard key={teacher.id} teacher={teacher} />)
					: [...Array(12)].map((index) => (
							<div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 group animate-pulse">
								<div className="w-full h-60 bg-MainDarkGray/60"></div>
								<div className="p-6 flex flex-col gap-2">
									<div className="w-1/2 h-6 bg-MainDarkGray/60 rounded-sm"></div>
									<div className="w-1/3 h-4 bg-MainDarkGray/60 rounded-sm mt-2"></div>

									<div className="text-sm text-gray-700 space-y-1 mt-4">
										<div className="w-3/4 h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
										<div className="w-1/2 h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
									</div>

									<div className="w-full h-12 bg-MainDarkGray/60 rounded-sm mt-3"></div>
								</div>
							</div>
					  ))}
			</div>
		</div>
	);
}

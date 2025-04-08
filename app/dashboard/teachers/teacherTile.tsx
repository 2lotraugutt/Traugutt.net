import { TeacherDataType } from "@/global";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import EditingForm from "./editingForm";

export default function AnnouncementTile(props: { teacherData: TeacherDataType; refetchTeachers: Function }) {
	const [deleteButtonText, setDeleteButtonText] = useState("Usuń pozycję");
	const [isEditing, setIsEditing] = useState<boolean>(false);

	async function deleteTeacher() {
		setDeleteButtonText("Usuwanie...");

		const data = new FormData();
		data.set("id", props.teacherData.id);

		await fetch("/api/dashboard/teachers", {
			method: "DELETE",
			body: data,
		});

		props.refetchTeachers();
		setDeleteButtonText("Usuń pozycję");
	}

	const createdAt = new Date(props.teacherData.createdAt).toLocaleDateString("pl-PL", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<div className="h-fit w-full text-left flex-col xl:flex-row xl:items-center border-2 hover:bg-LightGray/40 transition-all duration-300 py-5 md:py-6 md:px-8 px-5 lg:py-8 lg:px-8 3xl:px-12 xl:py-9 flex gap-y-4 md:gap-y-6 lg:gap-y-10 xl:gap-x-10 rounded-2xl">
			<div className="flex xl:max-w-[34rem] 2xl:max-w-[46.5rem] 3xl:max-w-4xl 4xl:max-w-[69rem] flex-col gap-y-2 xl:gap-y-5 lg:gap-y-3.5 w-full">
				<div className="flex items-center gap-x-4 lg:gap-x-6">
					<img src={props.teacherData.image} alt="Teacher's Photo" className="w-16 sm:h-20 sm:w-20 lg:w-24 lg:h-24 object-cover h-16 rounded-2xl lg:rounded-3xl" />
					<div className="flex flex-col gap-y-1.5 sm:gap-y-2 lg:gap-y-3 xl:gap-y-4 w-full">
						<p className={`line-clamp-1 md:line-clamp-2 text-sm 2xs:text-lg xs:text-lg sm:text-xl md:text-2xl 4xl:text-3xl poppinsFont700`}>
							<span className="text-MainDarkGray/60 text-2xs sm:text-base md:text-lg 4xl:text-xl mr-0.5">{props.teacherData.title}</span>
							{props.teacherData.name}
						</p>
						<div className="flex items-center gap-x-2 sm:gap-x-3 hide-scrollbar overflow-x-auto w-full">
							{props.teacherData.subjects.map((subj, i) => (
								<div key={i} className="bg-MainColor text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
									{subj}
								</div>
							))}
						</div>
						<div className={`text-2xs 2xl:text-base text-MainDarkGray/50 2xs:text-xs xs:text-sm 3xl:line-clamp-5 4xl:line-clamp-6 line-clamp-4 poppinsFont400`}>
							{props.teacherData.description}
						</div>
					</div>
				</div>
			</div>
			<div className={`flex flex-col md:flex-row md:justify-between xl:justify-evenly xl:gap-5 grow gap-y-2 flex-wrap plusJakartaSans500`}>
				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Utworzony: </p>
					<div className={`dashboardPostTileData plusJakartaSans700`}>{createdAt}</div>
				</div>
				{props.teacherData.class && (
					<div className="dashboardPostTileDataRow">
						<p className="h-fit">Wychowawca: </p>
						<div className={`dashboardPostTileData plusJakartaSans700`}>{props.teacherData.class}</div>
					</div>
				)}
				{props.teacherData.email && (
					<div className="dashboardPostTileDataRow">
						<p className="h-fit">Email: </p>
						<div className={`dashboardPostTileData plusJakartaSans700`}>{props.teacherData.email}</div>
					</div>
				)}
			</div>
			<div className="flex sm:grid sm:grid-cols-2 md:flex justify-between xl:justify-normal gap-y-2 2xl:gap-y-3 flex-col md:flex-row xl:flex-col gap-x-5">
				<button onClick={() => setIsEditing(true)} className={`group/button dashboard-post-tile plusJakartaSans700`}>
					Edytuj pozycję
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faPen} />
					</div>
				</button>
				<button onClick={() => deleteTeacher()} className={`group/button dashboard-post-tile plusJakartaSans700`}>
					{deleteButtonText}
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faTrash} />
					</div>
				</button>
			</div>
			{isEditing && <EditingForm initialData={props.teacherData} closeEdit={() => setIsEditing(false)} refetchTeachers={props.refetchTeachers} />}
		</div>
	);
}

import { TeacherDataType } from "@/global";
import { useState } from "react";

export default function EditingForm(props: { initialData: TeacherDataType; closeEdit: Function; refetchTeachers: Function }) {
	const [image, setImage] = useState(props.initialData.image ?? "");
	const [title, setTitle] = useState(props.initialData.title ?? "");
	const [className, setClassName] = useState(props.initialData.class ?? "");
	const [name, setName] = useState(props.initialData.name);
	const [email, setEmail] = useState(props.initialData.email ?? "");
	const [description, setDescription] = useState(props.initialData.description ?? "");
	const [subjects, setSubjects] = useState<string[]>(props.initialData.subjects || []);
	const [subjectInput, setSubjectInput] = useState("");
	const [imageError, setImageError] = useState(false);
	const [buttonText, setButtonText] = useState("Zapisz zmiany");
	const [emailValid, setEmailValid] = useState(true);

	async function edit() {
		setButtonText("Zapisywanie...");

		const data = new FormData();
		data.set("id", props.initialData.id);
		if (name !== "") data.set("name", name);
		if (email !== "") data.set("email", email);
		if (description !== "") data.set("description", description);
		if (image !== "") data.set("image", image);
		if (title !== "") data.set("title", title);
		if (className !== "") data.set("class", className);
		data.append("subjects", JSON.stringify(subjects));

		const res = await fetch("/api/dashboard/teachers", {
			method: "PUT",
			body: data,
		});

		if (!res.ok) {
			setButtonText("Wystąpił błąd");
			return;
		}

		props.closeEdit();
		props.refetchTeachers();
	}

	function addSubject() {
		if (subjectInput.trim() === "") return;
		setSubjects((prev) => [...prev, subjectInput.trim()]);
		setSubjectInput("");
	}

	function removeSubject(index: number) {
		setSubjects((prev) => prev.filter((_, i) => i !== index));
	}

	function validateEmail(email: string) {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		setEmailValid(emailRegex.test(email));
	}

	return (
		<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 flex flex-col items-center h-fit border-2 bg-LightGray py-6 px-6 gap-4 rounded-2xl">
			<h1 className="w-full text-xl md:text-2xl poppinsFont700">Edytuj nauczyciela</h1>

			{/* Title and Name Section */}
			<div className="w-full">
				<h2 className="text-sm sm:text-base font-semibold text-gray-700 mb-1">Podstawowe informacje</h2>
				<div className="flex flex-col sm:flex-row gap-3 w-full">
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						type="text"
						placeholder="Tytuł naukowy (opcjonalnie)"
						className="bg-white rounded-lg p-2 outline-none w-full text-sm sm:text-base"
					/>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="Imię i nazwisko"
						className="bg-white rounded-lg p-2 outline-none w-full text-sm sm:text-base"
					/>
				</div>
			</div>

			{/* Email Section */}
			<div className="w-full">
				<h2 className="text-sm sm:text-base font-semibold text-gray-700 mb-1 mt-1">Dane kontaktowe</h2>
				<input
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						validateEmail(e.target.value);
					}}
					type="email"
					placeholder="Email"
					className={`rounded-lg p-2 outline-none w-full text-sm sm:text-base ${emailValid ? "bg-white" : "bg-red-200"}`}
				/>
			</div>

			{/* Class and Subjects Section */}
			<div className="w-full">
				<h2 className="text-sm sm:text-base font-semibold text-gray-700 mb-1 mt-1">Klasa i przedmioty</h2>
				<div className="flex flex-col sm:flex-row gap-3 w-full">
					<input
						value={className}
						onChange={(e) => setClassName(e.target.value)}
						type="text"
						placeholder="Wychowawca klasy (opcjonalnie)"
						className="bg-white rounded-lg p-2 outline-none w-full text-sm sm:text-base"
					/>
					<div className="flex w-full gap-2 items-center">
						<input
							value={subjectInput}
							onChange={(e) => setSubjectInput(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSubject())}
							type="text"
							placeholder="Dodaj przedmiot i naciśnij Enter"
							className="bg-white rounded-lg p-2 outline-none w-full text-sm sm:text-base grow"
						/>
						<button type="button" onClick={addSubject} className="px-4 py-2 bg-MainColor text-white rounded-xl text-xs hover:bg-MainDarkGray transition-all">
							Dodaj
						</button>
					</div>
				</div>
				{subjects.length > 0 && (
					<div className="flex flex-wrap gap-2 w-full mt-2">
						<p className="text-sm sm:text-base text-gray-500">Dodane przedmioty:</p>
						{subjects.map((subj, index) => (
							<div key={index} className="bg-MainColor text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
								{subj}
								<button type="button" onClick={() => removeSubject(index)} className="ml-1 text-white font-bold hover:text-red-300">
									×
								</button>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Description Section */}
			<div className="w-full">
				<h2 className="text-sm sm:text-base font-semibold text-gray-700 mb-1 mt-1">Opis</h2>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Opis nauczyciela (opcjonalnie)"
					className="rounded-lg outline-none bg-white p-2 w-full text-sm sm:text-base h-32 sm:h-40"
				/>
			</div>

			{/* Image Section */}
			<div className="w-full">
				<h2 className="text-sm sm:text-base font-semibold text-gray-700 mb-1 mt-1">Zdjęcie</h2>
				<input
					value={image}
					onChange={(e) => {
						setImage(e.target.value);
						setImageError(false);
					}}
					type="text"
					placeholder="Link do zdjęcia"
					className="bg-white rounded-lg p-2 outline-none w-full text-sm sm:text-base"
				/>
				{image && !imageError && <img src={image} alt="Podgląd zdjęcia" className="w-32 h-32 object-cover rounded-xl border mt-2" onError={() => setImageError(true)} />}
			</div>

			{/* Action Buttons */}
			<div className="flex flex-col md:flex-row gap-x-6 gap-y-2 pt-2">
				<button onClick={edit} disabled={!emailValid} className="bg-MainColor hover:bg-MainDarkGray text-white px-6 py-2 rounded-3xl text-sm plusJakartaSans800">
					{buttonText}
				</button>
				<button onClick={() => props.closeEdit()} className="bg-MainDarkGray/70 hover:bg-MainDarkGray text-white px-6 py-2 rounded-3xl text-sm plusJakartaSans800">
					Anuluj
				</button>
			</div>
		</div>
	);
}

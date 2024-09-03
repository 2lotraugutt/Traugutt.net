"use client";

import Image from "next/image";
import { useState } from "react";

export default function StageTwo(props: { down: Function; up: Function; setImage: Function; setImageName: Function; initImageName: string; initImage: File | undefined }) {
	const [image, setImage] = useState<File | undefined>(props.initImage);
	const [imageName, setImageName] = useState(props.initImageName);

	function nextStage() {
		if (imageName) {
			props.setImage(image);
			props.setImageName(imageName);
			props.up();
		}
	}

	return (
		<div className="dashboard-post-page">
			<Image src="/newPost/Wave-2.svg" width="1920" height="1080" className="absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
			<div className="flex flex-col items-center gap-y-10 absolute top-1/2 max-w-3xl -translate-y-1/2">
				<div className="flex flex-col gap-y-3 max-w-2xl">
					<h1 className={`text-6xl text-center poppinsFont700`}>Dodaj główne zdjęcie</h1>
					<p className={`text-center px-5 text-lg poppinsFont400`}>
						To moment na ustawiene głównego zdjęcia twojego nowego postu. Wybierz takie, które jest najciekawsze. To pierwsze, co będzie dla wszystkich widoczne, i
						sprawi, że ktoś wejdzie w twój post!
						<br />
						(ps. zadbaj o to żeby było jak najlepszej jakości)
					</p>
				</div>

				<div className="space-y-6 w-full">
					<label>
						<input
							type="file"
							hidden
							onChange={(e) => {
								if (e.target.files) {
									const file = e.target.files[0];
									setImageName(URL.createObjectURL(file));
									setImage(e.target.files?.[0]);
								}
							}}
						/>
						<div className="w-full aspect-[25/16] rounded border-MainColor flex items-center justify-center border-2 border-dashed cursor-pointer">
							{imageName ? <img src={imageName} className="object-cover max-h-[40rem]" alt="" /> : <span className={`poppinsFont600`}>Wybierz zdjęcie</span>}
						</div>
					</label>
				</div>

				<div className="flex justify-between w-full max-w-2xl">
					<button onClick={() => props.down()} className={`bg-MainDarkGray px-8 py-3 text-white rounded-3xl plusJakartaSans600`}>
						Powrót
					</button>
					<button onClick={() => nextStage()} className={`bg-MainColor px-8 py-3 text-white rounded-3xl plusJakartaSans600`}>
						Kontynuuj
					</button>
				</div>
			</div>
		</div>
	);
}


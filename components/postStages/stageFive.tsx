"use client";

import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function StageFive(props: { down: Function; up: Function; setGallery: Function; initGallery: { name: string; image: File | undefined }[] }) {
	const [gallery, setGallery] = useState<{ name: string; image: File | undefined }[]>(props.initGallery);
	const [imageKey, setImageKey] = useState(1);

	return (
		<div className="dashboard-post-page">
			<Image src="/newPost/Wave-5.svg" width="1920" height="1080" className="absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
			<div className="flex flex-col items-center gap-y-10 absolute top-1/2 w-full -translate-y-1/2">
				<div className="flex flex-col gap-y-3 max-w-xl">
					<h1 className={`text-6xl text-center poppinsFont700`}>Galeria zdjęć</h1>
					<p className={`text-center px-5 text-lg poppinsFont400`}>
						<b className={`text-SecondColor poppinsFont600`}>To już ostatni krok! </b>
						Dodaj tyle zdjęć ile chcesz. Tylko nie przesadź, bo zrobi się bałagan i nikt na nie nie spojrzy. <br /> (Zalecamy dodawanie od około 4 do 9 zdjęć.)
					</p>
				</div>

				<div className="w-1/2 aspect-[3/2] overflow-y-auto p-3 border-2 border-dotted border-MainColor rounded-lg">
					<div className="grid grid-cols-3 gap-5 h-fit">
						<label>
							<input
								type="file"
								hidden
								onChange={({ target }) => {
									if (target.files) {
										const file = target.files?.[0];

										setGallery((oldGallery) => {
											oldGallery.push({ name: URL.createObjectURL(file), image: file });
											return oldGallery;
										});
										setImageKey((prev) => prev + 1);
									}
								}}
							/>
							<div
								className={`w-full aspect-[25/16] rounded border-SecondColor flex items-center justify-center border-2 border-dashed cursor-pointer poppinsFont600`}
							>
								Dodaj zdjęcie
							</div>
						</label>
						{gallery.map((image, index) => (
							<label key={index}>
								<input
									type="file"
									hidden
									onChange={({ target }) => {
										if (target.files) {
											const file = target.files?.[0];
											setGallery((oldGallery) => {
												oldGallery[index] = { name: URL.createObjectURL(file), image: file };
												return oldGallery;
											});
											setImageKey((prev) => prev + 1);
										}
									}}
								/>
								<div className={`relative w-full rounded flex items-center justify-center cursor-pointer poppinsFont600`}>
									<img key={imageKey} src={image.name} className="object-cover aspect-[25/16]" alt="" />
									<button
										onClick={() => {
											setGallery((oldGallery) => {
												let newGallery = oldGallery;
												newGallery.splice(index, 1);
												return newGallery;
											});
											setImageKey((prev) => prev + 1);
										}}
										className="rounded-full flex items-center justify-center group bg-MediumGray hover:bg-MainColor transition-all h-5 w-5 absolute -top-2 -right-2 z-10"
									>
										<FontAwesomeIcon icon={faRemove} className="transition-all text-black group-hover:text-white" />
									</button>
								</div>
							</label>
						))}
					</div>
				</div>

				<div className="flex justify-between w-full max-w-xl">
					<button onClick={() => props.down()} className={`bg-MainDarkGray px-8 py-3 text-white rounded-3xl plusJakartaSans600`}>
						Powrót
					</button>
					<button onClick={() => props.up()} className={`bg-MainColor px-8 py-3 text-white rounded-3xl plusJakartaSans600`}>
						Kontynuuj
					</button>
				</div>
			</div>
		</div>
	);
}

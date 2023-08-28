"use client";

import StageOne from "@/components/newPostStages/stageOne";
import StageTwo from "@/components/newPostStages/stageTwo";
import StageZero from "@/components/newPostStages/stageZero";
import { useState } from "react";

export default function Page() {
	const [stage, setStage] = useState(0);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState<File>();
	const [imageName, setImageName] = useState("");

	function stageUp() {
		setStage((oldStage) => oldStage + 1);
	}
	function stageDown() {
		setStage((oldStage) => oldStage - 1);
	}

	if (stage == 0) return <StageZero up={stageUp} />;
	if (stage == 1) return <StageOne down={stageDown} up={stageUp} setTitle={(text: string) => setTitle(text)} />;
	if (stage == 2) return <StageTwo down={stageDown} up={stageUp} setImage={(image: File) => setImage(image)} setImageName={(name: string) => setImageName(name)} />;
	else setStage(0);
}

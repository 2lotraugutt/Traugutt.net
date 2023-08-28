"use client";

import StageOne from "@/components/newPostStages/stageOne";
import StageThree from "@/components/newPostStages/stageThree";
import StageTwo from "@/components/newPostStages/stageTwo";
import StageZero from "@/components/newPostStages/stageZero";
import { useState } from "react";

export default function Page() {
	const [stage, setStage] = useState(0);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState<File>();
	const [imageName, setImageName] = useState("");
	const [content, setContent] = useState("");

	function stageUp() {
		setStage((oldStage) => oldStage + 1);
	}
	function stageDown() {
		setStage((oldStage) => oldStage - 1);
	}

	if (stage == 0) return <StageZero up={stageUp} />;
	if (stage == 1) return <StageOne down={stageDown} up={stageUp} setTitle={(text: string) => setTitle(text)} />;
	if (stage == 2) return <StageTwo down={stageDown} up={stageUp} setImage={(image: File) => setImage(image)} setImageName={(name: string) => setImageName(name)} />;
	if (stage == 3) return <StageThree down={stageDown} up={stageUp} setContent={(content: string) => setContent(content)} />;
	else setStage(0);
}

import MarkdownDisplay from "@/lib/markdownDisplay";
import { promises as fs } from "fs";
import "md-editor-rt/lib/preview.css";
import EditComponent from "../editComponent";

export default async function Page({ params: { title } }: { params: { title: string } }) {
	const text = await fs.readFile(process.cwd() + `/content/${title}.mdx`, "utf8");

	return (
		<>
			<EditComponent text={text} />
			<MarkdownDisplay text={text} />;
		</>
	);
}

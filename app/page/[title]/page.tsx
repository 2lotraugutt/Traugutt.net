import "md-editor-rt/lib/preview.css";
import { promises as fs } from "fs";
import MarkdownDisplay from "@/components/markdownDisplay";

export default async function Page({ params: { title } }: { params: { title: string } }) {
	const text = await fs.readFile(process.cwd() + `/content/${title}.mdx`, "utf8");

	return <MarkdownDisplay text={text} />;
}

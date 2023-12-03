export default function removeMarkdown(markdownText: string): string {
	// Remove headings
	markdownText = markdownText.replace(/#+\s+/g, "");

	// Remove horizontal rules (--- or ***)
	markdownText = markdownText.replace(/-{3,}|\*{3,}/g, "");

	// Remove bold and italic formatting
	markdownText = markdownText.replace(/\*\*([^*]+)\*\*|\*([^*]+)\*/g, "$1$2");

	// Remove lists and sublists
	markdownText = markdownText.replace(/- /g, "");
	markdownText = markdownText.replace(/\* /g, "");

	// Remove blockquotes
	markdownText = markdownText.replace(/> /g, "");

	// Remove inline code
	markdownText = markdownText.replace(/`([^`]+)`/g, "$1");

	// Remove images
	markdownText = markdownText.replace(/!\[.*?\]\((.*?)\)/g, "");

	// Remove links
	markdownText = markdownText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");

	// Remove strikethrough
	markdownText = markdownText.replace(/~~(.*?)~~/g, "$1");

	markdownText = markdownText.replace(/\t|\n/g, " ");

	// Remove extra newlines at the beginning and end
	markdownText = markdownText.trim();

	return markdownText;
}

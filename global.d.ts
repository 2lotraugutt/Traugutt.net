type PostDataType = {
	id: string;
	title: string;
	content: string | null;
	titleImage: string;
	gallery: string[];
	createdAt: Date;
	views: number;
	authorId: string;
	published: boolean;
};

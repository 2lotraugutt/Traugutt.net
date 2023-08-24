export {};

declare global {
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
		publishedById: string;
	};

	type PostDataTypeWithAuthor = {
		id: string;
		title: string;
		content: string | null;
		titleImage: string;
		gallery: string[];
		createdAt: Date;
		views: number;
		authorId: string;
		author: UserDataType;
		published: boolean;
		publishedById: string;
	};

	type UserDataType = {
		id: String;
		email: String;
		emailVerified: DateTime?;
		name: string;
		profilePicture: String;
	};
}

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
	};

	type UserDataType = {
		id: String;
		email: String;
		emailVerified: DateTime?;
		firstName: String;
		lastName: String;
		profilePicture: String;
	};
}

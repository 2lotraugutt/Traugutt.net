import { Role } from "./node_modules/.prisma/client/index.d";
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
		id: string;
		emailVerified: Date | null;
		email: string;
		name: string;
		image: string;
		verified: Boolean | null;
		roleTag: string;
	};

	type UserDataTypeWithRole = {
		id: string;
		emailVerified: Date | null;
		email: string;
		name: string;
		image: string;
		verified: Boolean | null;
		role: RoleDataType;
		roleTag: string;
	};

	type SessionDataType = {
		id: string;
		sessionToken: string;
		userId: string;
		user: UserDataTypeWithRole;
		expires: string;
	};

	type RoleDataType = {
		id: String;
		tag: String;
		name: String;

		createPosts: Boolean;
		publishPosts: Boolean;
		managePosts: Boolean;
		manageUsers: Boolean;
		manageUserRoles: Boolean;
		manageEvents: Boolean;
		manageRoles: Boolean;
	};
}

import { getYear } from "date-fns";
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

	type PostDataTypeWithAuthorAndPublisher = {
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
		publishedById: string?;
		publishedBy: UserDataType?;
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
		tag: String;
		name: String;

		createPosts: Boolean;
		publishPosts: Boolean;
		managePosts: Boolean;
		manageUsers: Boolean;
		verifyUsers: Boolean;
		manageEvents: Boolean;
		manageCalendar: Boolean;
		manageRoles: Boolean;
	};

	type DayDataTypeWithEvents = {
		date: string;
		number: number?;
		freeDay: boolean;
		day: number;
		month: number;
		year: number;
		timeStamp: Date;
		events: EventDataType[];
	};

	type EventDataType = {
		id: String;
		createdAt: Date;
		name: String;
		description: String?;
		date: Date;
		freeDay: boolean;
		tagId: string;
		tag: EventTagType[];
		authorId: string;
	};

	type EventTagDataType = {
		id: String;
		createdAt: Date;
		name: String;
		color: String;
		authorId: string;
	};
}

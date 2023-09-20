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
		tag: string;
		name: string;

		createPosts: Boolean;
		publishPosts: Boolean;
		managePosts: Boolean;
		manageUsers: Boolean;
		verifyUsers: Boolean;
		manageEvents: Boolean;
		manageCalendar: Boolean;
		manageRoles: Boolean;
		manageNotifications: Boolean;
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
		id: string;
		createdAt: Date;
		name: string;
		description: string?;
		date: string;
		freeDay: boolean;
		tags: EventTagType[];
		authorId: string;
	};

	type EventDataTypeWithAuthor = {
		id: string;
		createdAt: Date;
		name: string;
		description: string?;
		date: string;
		freeDay: boolean;
		tags: EventTagType[];
		authorId: string;
		author: UserDataType;
	};

	type EventTagDataType = {
		id: string;
		createdAt: Date;
		name: string;
		color: string;
		authorId: string;
	};

	type NotificationDataType = {
		id: string;
		createdAt: Date;
		title: string;
		content: string;
		authorId: string;
	};

	type NotificationWithAutorDataType = {
		id: string;
		createdAt: Date;
		title: string;
		content: string;
		authorId: string;
		author: UserDataType;
	};
}

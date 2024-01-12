import { getYear } from "date-fns";
import { Role } from "./node_modules/.prisma/client/index.d";

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
		eventId: string?;
	};

	type PostDataTypeWithAuthorAndEvent = {
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
		eventId: string?;
		event: EventDataType;
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
		eventId: string?;
	};

	type UserDataType = {
		id: string;
		emailVerified: Date | null;
		email: string;
		name: string;
		image: string;
		verified: Boolean | null;
		roleTag: string;
		changeName: Boolean;
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
		changeName: Boolean;
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
		manageNumbers: Boolean;
		manageNotifications: Boolean;
		managePages: Boolean;
		addAnnouncements: Boolean;
		manageAnnouncements: Boolean;
		manageRoles: Boolean;
	};

	type DayDataType = {
		date: string;
		number: number?;
		freeDay: boolean;
		day: number;
		month: number;
		year: number;
		timeStamp: Date;
	};

	type DayDataTypeWithEventsAndPost = {
		date: string;
		number: number?;
		freeDay: boolean;
		day: number;
		month: number;
		year: number;
		timeStamp: Date;
		events: EventDataTypeWithPost[];
	};

	type EventDataType = {
		id: string;
		createdAt: Date;
		name: string;
		description: string?;
		date: string;
		tags: EventTagDataType[];
		authorId: string;
	};

	type EventDataTypeWithAuthor = {
		id: string;
		createdAt: Date;
		name: string;
		description: string?;
		date: string;
		tags: EventTagDataType[];
		authorId: string;
		author: UserDataType;
	};

	type EventDataTypeWithPost = {
		id: string;
		createdAt: Date;
		name: string;
		description: string?;
		date: string;
		tags: EventTagDataType[];
		authorId: string;
		post: PostDataType?;
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
		pinned: boolean;
	};

	type NotificationWithAutorDataType = {
		id: string;
		createdAt: Date;
		title: string;
		content: string;
		authorId: string;
		author: UserDataType;
		pinned: boolean;
	};

	type RouteDataType = {
		id: string;
		name: string;
		link: string;
		category: RouteCategoryDataType;
	};

	type RouteCategoryDataType = "school" | "student" | "parents" | "recruitation" | "exam" | "docs";

	type AnnouncementWithAutorDataType = {
		id: string;
		createdAt: Date;
		content: string;
		days: DayDataType[];
		authorId: string;
		author: UserDataType;
	};

}

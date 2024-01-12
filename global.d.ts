import { getYear } from "date-fns";
import { Role } from "./node_modules/.prisma/client/index.d";

declare global {
	type JustPostDataType = {
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
		author: JustUserDataType;
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
		author: JustUserDataType;
		published: boolean;
		publishedById: string?;
		publishedBy: JustUserDataType?;
		eventId: string?;
	};

	type JustUserDataType = {
		id: string;
		emailVerified: Date | null;
		email: string;
		name: string;
		image: string;
		verified: Boolean | null;
		roleTag: string;
		changeName: Boolean;
	};

	type UserDataType = {
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
		user: UserDataType;
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

	type JustDayDataType = {
		date: string;
		number: number?;
		freeDay: boolean;
		day: number;
		month: number;
		year: number;
		timeStamp: Date;
	};

	type DayDataType = {
		date: string;
		number: number?;
		freeDay: boolean;
		day: number;
		month: number;
		year: number;
		timeStamp: Date;
		events: EventDataTypeWithPost[];
		announcements: JustAnnouncementDataType[];
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
		author: JustUserDataType;
	};

	type EventDataTypeWithPost = {
		id: string;
		createdAt: Date;
		name: string;
		description: string?;
		date: string;
		tags: EventTagDataType[];
		authorId: string;
		post: JustPostDataType?;
	};

	type EventTagDataType = {
		id: string;
		createdAt: Date;
		name: string;
		color: string;
		authorId: string;
	};

	type JustNotificationDataType = {
		id: string;
		createdAt: Date;
		title: string;
		content: string;
		authorId: string;
		pinned: boolean;
	};

	type NotificationDataType = {
		id: string;
		createdAt: Date;
		title: string;
		content: string;
		authorId: string;
		author: JustUserDataType;
		pinned: boolean;
	};

	type RouteDataType = {
		id: string;
		name: string;
		link: string;
		category: RouteCategoryDataType;
	};

	type RouteCategoryDataType = "school" | "student" | "parents" | "recruitation" | "exam" | "docs";

	type JustAnnouncementDataType = {
		id: string;
		createdAt: Date;
		content: string;
		days: JustDayDataType[];
		authorId: string;
	};
	type AnnouncementDataType = {
		id: string;
		createdAt: Date;
		content: string;
		days: JustDayDataType[];
		authorId: string;
		author: JustUserDataType;
	};

}

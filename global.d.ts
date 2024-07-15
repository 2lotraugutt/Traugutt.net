export declare global {
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
		pinned: boolean;
		publishedById: ?string;
		editedById: ?string;
		eventId: ?string;
	};

	type PostDataType = {
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
		pinned: boolean;
		publishedById: ?string;
		editedById: ?string;
		eventId: ?string;
		event: EventDataType;
		publishedBy: ?JustUserDataType;
	};

	type JustUserDataType = {
		id: string;
		email: string | null;
		name: string;
		login: string;
		image: string;
		roleTag: string;
	};

	type UserDataType = {
		id: string;
		email: string | null;
		name: string;
		login: string;
		image: string;
		role: RoleDataType;
		roleTag: string;
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

		createPosts: boolean;
		publishPosts: boolean;
		managePosts: boolean;
		manageUsers: boolean;
		manageEvents: boolean;
		manageCalendar: boolean;
		manageNumbers: boolean;
		manageNotifications: boolean;
		managePages: boolean;
		addAnnouncements: boolean;
		manageAnnouncements: boolean;
		manageRoles: boolean;
	};

	type JustDayDataType = {
		date: string;
		number: ?number;
		freeDay: boolean;
		day: number;
		month: number;
		year: number;
		timeStamp: Date;
	};

	type DayDataType = {
		date: string;
		number: ?number;
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
		description: ?string;
		date: string;
		tags: EventTagDataType[];
		authorId: string;
	};

	type EventDataTypeWithAuthor = {
		id: string;
		createdAt: Date;
		name: string;
		description: ?string;
		date: string;
		tags: EventTagDataType[];
		authorId: string;
		author: JustUserDataType;
	};

	type EventDataTypeWithPost = {
		id: string;
		createdAt: Date;
		name: string;
		description: ?string;
		date: string;
		tags: EventTagDataType[];
		authorId: string;
		post: ?JustPostDataType;
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
		createdAt: Date;
		category: RouteCategoryDataType;
	};

	type RouteCategoryDataType = "school" | "student" | "parents" | "recruitation" | "exam" | "trips" | "docs"  ;

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

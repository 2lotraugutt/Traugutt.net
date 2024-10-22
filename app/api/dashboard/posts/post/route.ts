import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid_v4 } from "uuid";

export async function POST(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.createPosts) {
			const data = await request.formData();
			const image: File = data.get("image") as File;
			const title: string = data.get("title") as string;
			const content: string = data.get("content") as string;
			const eventId: string = data.get("eventId") as string;
			const gallery = data.getAll("gallery[]") as File[];

			let imgPaths = [];

			const bytes = await image.arrayBuffer();
			const buffer = Buffer.from(bytes);
			const name = uuid_v4() + "." + image.name.split(".").pop();
			const path = `./postImages/${name}`;
			const imgPath = `https://traugutt.net/postImages/${name}`;
			await writeFile(path, new Uint8Array(buffer));

			for (const image of gallery) {
				const name = uuid_v4() + "." + image.name.split(".").pop();
				const bytes = await image.arrayBuffer();
				const buffer = Buffer.from(bytes);
				const path = `./postImages/${name}`;
				imgPaths.push(`https://traugutt.net/postImages/${name}`);
				await writeFile(path, new Uint8Array(buffer));
			}

			await prisma.post.create({
				data: {
					title: title,
					content: content,
					authorId: session.user.id,
					titleImage: imgPath,
					gallery: imgPaths,
					eventId: eventId,
					published: session.user.role.managePosts,
					publishedById: session.user.role.managePosts ? session.user.id : null,
				},
			});

			return NextResponse.json({ success: true });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function PUT(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.createPosts) {
			const data = await request.formData();

			const id = data.get("id") as string;
			const title = data.get("title") as string;
			const content = data.get("content") as string;
			const image = data.get("image") as File | "";
			const imageName = data.get("imageName") as string;
			const eventId: string = data.get("eventId") as string;

			// const gallery = data.getAll("gallery[]") as (File | "")[];
			// const galleryNames = data.getAll("galleryNames[]") as string[];

			let imgPath;

			if (image == "") imgPath = imageName;
			else {
				const bytes = await image.arrayBuffer();
				const buffer = Buffer.from(bytes);
				const name = uuid_v4() + "." + image.name.split(".").pop();
				const path = `./postImages/${name}`;
				imgPath = `https://traugutt.net/postImages/${name}`;
				await writeFile(path, new Uint8Array(buffer));
			}

			// Editing photos is #TODO
			// let i = 0;
			// for (const image of gallery) {
			// 	if (image == "") {
			// 		imgPaths.push(galleryNames[i]);
			// 	} else {
			// 		const name = uuid_v4() + "." + image.name.split(".").pop();
			// 		const bytes = await image.arrayBuffer();
			// 		const buffer = Buffer.from(bytes);
			// 		const path = `./postImages/${name}`;
			// 		imgPaths.push(`/postImages/${name}`);
			// 		await writeFile(path, buffer);
			// 	}
			// 	i++;
			// }

			const post = await prisma.post.update({
				where: {
					id: id,
					authorId: session.user.role.managePosts ? undefined : session.user.id,
				},
				data: {
					title: title,
					content: content,
					titleImage: imgPath,
					eventId: eventId,
					// gallery: imgPaths,
					published: session.user.role.managePosts,
					publishedById: session.user.role.managePosts ? session.user.id : null,
					editedById: session.userId,
				},
			});

			if (post) return NextResponse.json({ success: true });
			else return NextResponse.json({ error: "Permissions exceeded" }, { status: 500 });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function DELETE(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	const data = await request.formData();

	const id = data.get("id") as string;

	if (session) {
		const post = await prisma.post.delete({
			where: {
				id: id,
				authorId: session.user.role.managePosts ? undefined : session.user.id,
			},
		});

		if (post) return NextResponse.json(post);
		else return NextResponse.json({ error: "Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

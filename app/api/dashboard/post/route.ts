import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { v4 as uuid_v4 } from "uuid";

export async function PUT(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		const role = session.user.role;

		if (role == "USER") return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
		else {
			const data = await request.formData();
			const image: File = data.get("image") as unknown as File;
			const title: string = data.get("title") as string;
			const content: string = data.get("content") as string;
			const gallery = data.getAll("gallery[]") as unknown as File[];

			let imgPaths = [];

			const bytes = await image.arrayBuffer();
			const buffer = Buffer.from(bytes);
			const name = uuid_v4() + "." + image.name.split(".").pop();
			const path = `public/postImages/${name}`;
			const imgPath = `/postImages/${name}`;
			await writeFile(path, buffer);

			for (const image of gallery) {
				const name = uuid_v4() + "." + image.name.split(".").pop();
				const bytes = await image.arrayBuffer();
				const buffer = Buffer.from(bytes);
				const path = `public/postImages/${name}`;
				imgPaths.push(`/postImages/${name}`);
				await writeFile(path, buffer);
			}

			await prisma.post.create({
				data: {
					title: title,
					content: content,
					authorId: session.user.id,
					titleImage: imgPath,
					gallery: imgPaths,
				},
			});

			return NextResponse.json({ success: false });
		}
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function POST(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		const role = session.user.role;

		if (role == "USER") return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
		else {
			const data = await request.formData();

			const id = data.get("id") as string;
			const title = data.get("title") as string;
			const content = data.get("content") as string;
			const image = data.get("image") as File | "";
			const imageName = data.get("imageName") as string;
			const gallery = data.getAll("gallery[]") as (File | "")[];
			const galleryNames = data.getAll("galleryNames[]") as string[];

			let imgPath;
			let imgPaths = [];

			if (image == "") imgPath = imageName;
			else {
				const bytes = await image.arrayBuffer();
				const buffer = Buffer.from(bytes);
				const name = uuid_v4() + "." + image.name.split(".").pop();
				const path = `public/postImages/${name}`;
				imgPath = `/postImages/${name}`;
				await writeFile(path, buffer);
			}

			for (const image of gallery) {
				if (image == "") imgPaths.push(galleryNames[gallery.indexOf(image)]);
				else {
					const name = uuid_v4() + "." + image.name.split(".").pop();
					const bytes = await image.arrayBuffer();
					const buffer = Buffer.from(bytes);
					const path = `public/postImages/${name}`;
					imgPaths.push(`/postImages/${name}`);
					await writeFile(path, buffer);
				}
			}

			const post = await prisma.post.update({
				where: { id: id, authorId: role == "USER" || role == "TEACHER" || role == "ADMIN" ? undefined : session.user.id },
				data: {
					title: title,
					content: content,
					authorId: session.user.id,
					titleImage: imgPath,
					gallery: imgPaths,
					published: false,
					publishedById: null,
				},
			});

			if (post) return NextResponse.json({ success: false });
			else return NextResponse.json({ error: "Permissions exceeded" }, { status: 500 });
		}
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}


import { NextResponse } from "next/server";
import { getPostData } from "@/libraries/post";


export async function GET(
	request: Request,
	{ params }: { params: { path: string[]; }; }
) {
	const { path } = params;

	let id: string = "";
	const category: string[] = [];

	if (path.length <= 1) {
		id = path[0];
	} else {
		id = path[path.length - 1];
		category.push(...path.slice(0, path.length - 1));
	}

	const postData = await getPostData(id, category);
	return NextResponse.json({ postData });
}

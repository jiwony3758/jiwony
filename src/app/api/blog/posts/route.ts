import { getSortedPostsData } from "@/libraries/post";
import { NextResponse } from "next/server";

export function GET() {
  const postsData = getSortedPostsData();
  return NextResponse.json({ posts: postsData });
}

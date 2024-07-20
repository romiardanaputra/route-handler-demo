import { headers } from "next/headers";
import { comments } from "./data";

export async function GET() {
  return Response.json(comments);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newComment = {
    id: comments.length + 1,
    ...body,
  };
  comments.push(newComment);
  return new Response(JSON.stringify(comments), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}

import { headers } from "next/headers";
import { comments } from "./data";

/**
 * A description of the entire function.
 *
 * @return {type} description of return value
 */
export async function GET() {
  return Response.json(comments);
}

/**
 * Function to handle POST requests for adding new comments.
 *
 * @param {Request} request - The request object containing the comment data.
 * @return {Response} The response object with the added comment and status.
 */
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

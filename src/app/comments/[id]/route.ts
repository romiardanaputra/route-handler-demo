import { comments } from "../data";

interface Comment {
  params: {
    id: string;
  };
}
/**
 * A description of the entire function.
 *
 * @return {type} description of return value
 */
export async function GET(request: Request, { params }: Comment) {
  const comment = comments.find(
    (comment) => comment.id === parseInt(params.id)
  );

  if (!comment) {
    return new Response(JSON.stringify(comment), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 404,
    });
  }

  return Response.json(comment);
}
/**
 * A description of the entire function.
 *
 * @param {Request} request - The request object containing the comment data.
 * @param {Comment} params - The parameters object containing the comment ID.
 * @return {Response} The response object with the updated comment and status.
 */
export async function PATCH(request: Request, { params }: Comment) {
  const body = await request.json();
  const { text } = body;
  const index = comments.findIndex(
    (comment) => comment.id === parseInt(params.id)
  );
  comments[index].text = text;
  return Response.json(comments[index]);
}


export async function DELETE(request: Request, { params }: Comment) {
  const CommentId = comments.findIndex(
    (comment) => comment.id === parseInt(params.id)
  );

  const deletedComment = comments[CommentId];
  comments.splice(CommentId, 1);
  return new Response(
    JSON.stringify({
      message: "Comment successfully deleted",
      deletedComment,
      comments,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

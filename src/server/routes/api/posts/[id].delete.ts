import {defineEventHandler, getRouterParam, readValidatedBody, sendRedirect} from "h3";
import {postSchema} from "../../../validations/post.validation";
import {postModel} from "../../../models/post.model";
import {Post} from "../../../../generated/prisma/client";
import {adminOrOwnerCheckByAuthorId} from "../../../utils/adminOrOwnerCheckByAuthorId";
import {StatusCodes} from "http-status-codes";

export default defineEventHandler(async (event) => {
  //----> Get the post-id from param.
  const id = getRouterParam(event, 'id') as string;

  //----> Delete the post by id.
  const deletedPost = await postModel.deletePostById(id);

  //----> Check for ownership or admin privilege.
  if (!await adminOrOwnerCheckByAuthorId(deletedPost.authorId as string, event)){
    await sendRedirect(event, '/unauthorized', StatusCodes.FORBIDDEN);
    return;
  }

  //----> Return the deleted post.
  return deletedPost;
});

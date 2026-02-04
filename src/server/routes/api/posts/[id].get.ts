import {defineEventHandler, getRouterParam, sendRedirect} from "h3";
import {postModel} from "../../../models/post.model";
import {adminOrOwnerCheckByAuthorId} from "../../../utils/adminOrOwnerCheckByAuthorId";
import {StatusCodes} from "http-status-codes";

export default defineEventHandler(async (event) => {
  //----> Get the post-id from param.
  const id = getRouterParam(event, 'id') as string;

  //----> Get the post by id.
  const post = await postModel.getPostById(id);

  //----> Check for ownership or admin privilege.
  if (!await adminOrOwnerCheckByAuthorId(post.authorId as string, event)){
    await sendRedirect(event, '/unauthorized', StatusCodes.FORBIDDEN);
    return;
  }

  //----> Return the post.
  return post;
});

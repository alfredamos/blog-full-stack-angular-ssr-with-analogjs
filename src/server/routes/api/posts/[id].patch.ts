import {defineEventHandler, getRouterParam, readValidatedBody, sendRedirect} from "h3";
import {postSchema} from "../../../validations/post.validation";
import {postModel} from "../../../models/post.model";
import {Post} from "../../../../generated/prisma/client";
import {adminOrOwnerCheckByAuthorId} from "../../../utils/adminOrOwnerCheckByAuthorId";
import {StatusCodes} from "http-status-codes";

export default defineEventHandler(async (event) => {
  //----> Get the post-id from param.
  const id = getRouterParam(event, 'id') as string;

  //----> Get the post-payload from the body.
  const post = await readValidatedBody(event, postSchema.parse);

  //----> Update the date and time of the post.
  post.dateAndTime = new Date();

  //----> Edit the post with the given id.
  const editedPost =  await postModel.editPostById(id, post as Post);

  //----> Check for ownership or admin privilege.
  if (!await adminOrOwnerCheckByAuthorId(editedPost.authorId as string, event)){
    await sendRedirect(event, '/unauthorized', StatusCodes.FORBIDDEN);
    return;
  }

  //----> Return the edited post.
  return editedPost;
});

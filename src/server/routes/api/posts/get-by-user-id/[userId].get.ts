import {defineEventHandler, getRouterParam} from "h3";
import {postModel} from "../../../../models/post.model";

export default defineEventHandler(async (event) => {
  //----> Get the author id from param.
  const userId = getRouterParam(event, 'userId') as string;

  //----> Get the post by user-id.
  return await postModel.getPostsByUserId(userId);
});

import {defineEventHandler, getRouterParam} from "h3";
import {postModel} from "../../../../models/post.model";

export default defineEventHandler(async (event) => {
  //----> Get the user id from param.
  const userId = getRouterParam(event, 'userId') as string;

  //----> Get the posts by user-id.
  return await postModel.getPostsByUserId(userId);
});

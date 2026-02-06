import {defineEventHandler, getRouterParam, sendRedirect} from "h3";
import {postModel} from "../../../models/post.model";

export default defineEventHandler(async (event) => {
  //----> Get the post-id from param.
  const id = getRouterParam(event, 'id') as string;

  //----> Get the post by id.
  const post = await postModel.getPostById(id);

  //----> Return the post.
  return post;
});

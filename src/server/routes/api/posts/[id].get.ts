import {defineEventHandler, getRouterParam, sendRedirect} from "h3";
import {postModel} from "../../../models/post.model";

export default defineEventHandler(async (event) => {
  //----> Get the post-id from param.
  const id = getRouterParam(event, 'id') as string;

  //----> Get the post by id.
  const post = await postModel.getPostById(id);

  console.log("In the right place in post-get route!");
  //----> Return the post.
  return post;
});

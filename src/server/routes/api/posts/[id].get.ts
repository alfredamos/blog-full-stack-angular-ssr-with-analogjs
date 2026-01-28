import {defineEventHandler, getRouterParam} from "h3";
import {postModel} from "../../../models/post.model";

export default defineEventHandler(async (event) => {
  //----> Get the author id from param.
  const id = getRouterParam(event, 'id') as string;

  //----> Get the post by id.
  return await postModel.getPostById(id);
});

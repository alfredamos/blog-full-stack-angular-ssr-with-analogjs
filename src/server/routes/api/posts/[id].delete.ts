import {defineEventHandler, getRouterParam, readValidatedBody} from "h3";
import {postSchema} from "../../../validations/post.validation";
import {postModel} from "../../../models/post.model";
import {Post} from "../../../../generated/prisma/client";

export default defineEventHandler(async (event) => {
  //----> Get the author id from param.
  const id = getRouterParam(event, 'id') as string;

  //----> Delete the post by id.
  return await postModel.deletePostById(id);
});

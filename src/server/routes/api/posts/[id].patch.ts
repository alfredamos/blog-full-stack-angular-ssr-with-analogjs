import {defineEventHandler, getRouterParam, readValidatedBody} from "h3";
import {postSchema} from "../../../validations/post.validation";
import {postModel} from "../../../models/post.model";
import {Post} from "../../../../generated/prisma/client";

export default defineEventHandler(async (event) => {
  //----> Get the author id from param.
  const id = getRouterParam(event, 'id') as string;

  //----> Get the author payload from the body.
  const post = await readValidatedBody(event, postSchema.parse);

  //----> Edit the post with the given id.
  return await postModel.editPostById(id, post as Post);
});

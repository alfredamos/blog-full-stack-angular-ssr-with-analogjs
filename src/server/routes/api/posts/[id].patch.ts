import {defineEventHandler, getRouterParam, readValidatedBody} from "h3";
import {postSchema} from "../../../validations/post.validation";
import {postModel} from "../../../models/post.model";
import {Post} from "../../../../generated/prisma/client";

export default defineEventHandler(async (event) => {
  //----> Get the post-id from param.
  const id = getRouterParam(event, 'id') as string;

  //----> Get the post-payload from the body.
  const post = await readValidatedBody(event, postSchema.parse);

  //----> Update the date and time of the post.
  //post.dateAndTime = new Date().toLocaleString();

  //----> Edit the post with the given id.
  return await postModel.editPostById(id, post as Post);
});

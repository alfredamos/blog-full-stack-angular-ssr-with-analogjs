import {defineEventHandler, readValidatedBody} from "h3";
import {postSchema} from "../../../validations/post.validation";
import {postModel} from "../../../models/post.model";
import {Post} from "../../../../generated/prisma/client";

export default defineEventHandler(async (event) => {
  //----> Get the post-payload from the body.
  const post = await readValidatedBody(event, postSchema.parse);

  //----> Create the new post.
  return await postModel.createPost(post as Post, event);
});

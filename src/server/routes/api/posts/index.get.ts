import {defineEventHandler, readValidatedBody} from "h3";
import {postModel} from "../../../models/post.model";

export default defineEventHandler(async (event) => {
  //----> Fetch all the posts.
  return await postModel.getAllPosts();
});

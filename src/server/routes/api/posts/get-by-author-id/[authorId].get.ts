import {defineEventHandler, getRouterParam} from "h3";
import {postModel} from "../../../../models/post.model";

export default defineEventHandler(async (event) => {
  //----> Get the author id from param.
  const authorId = getRouterParam(event, 'authorId') as string;

  //----> Get the posts by author-id.
  return await postModel.getPostsByAuthorId(authorId);
});

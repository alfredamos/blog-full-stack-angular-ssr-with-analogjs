import {defineEventHandler, getRouterParam} from 'h3';
import {authorModel} from "../../../../models/author.model";

export default defineEventHandler(async (event) => {
  console.log('The right one, getting author with user by author id');
  //----> Get the author id from param.
  const authorId = getRouterParam(event, 'authorId') as string;

  //----> Get the author by id.
  return authorModel.getAuthorWithUserByAuthorId(authorId);
});

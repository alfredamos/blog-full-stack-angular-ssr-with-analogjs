import {defineEventHandler, getRouterParam} from 'h3';
import {authorModel} from "../../../../models/author.model";

export default defineEventHandler(async (event) => {
  //----> Get the author id from param.
  const userId = getRouterParam(event, 'userId') as string;

  //----> Get the author by id.
  return authorModel.getAuthorByUserId(userId);
});

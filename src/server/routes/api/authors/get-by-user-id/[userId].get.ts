import {authorModel} from "../../../../models/author.model";
import {defineEventHandler, getRouterParam} from "h3";

export default defineEventHandler(async (event) => {
  //----> Get the author user-id from param.
  const userId = getRouterParam(event, 'userId') as string;

  //----> Get the author by user-id.
  return authorModel.getAuthorByUserId(userId);
});

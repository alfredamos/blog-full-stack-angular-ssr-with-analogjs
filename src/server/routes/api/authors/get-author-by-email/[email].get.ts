import {defineEventHandler, getRouterParam} from 'h3';
import {authorModel} from "../../../../models/author.model";

export default defineEventHandler(async (event) => {
  //----> Get the author id from param.
  const email = getRouterParam(event, 'email') as string;

  //----> Get the author by id.
  return authorModel.getAuthorByEmail(email);
});

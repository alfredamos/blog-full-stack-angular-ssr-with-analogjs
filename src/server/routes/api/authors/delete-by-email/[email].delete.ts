import {authorModel} from "../../../../models/author.model";
import {defineEventHandler, getRouterParam} from "h3";

export default defineEventHandler(async (event) => {
  //----> Get the author email from param.
  const email = getRouterParam(event, 'email') as string;

  //----> Delete the author by user-id.
  return authorModel.deleteAuthorByEmail(email);
});

import {authorModel} from "../../../models/author.model";
import {defineEventHandler, getRouterParam} from "h3";

export default defineEventHandler(async (event) => {
  //----> Get the author id from param.
  const id = getRouterParam(event, 'id') as string;

  //----> Delete the author by id.
  return authorModel.deleteAuthorById(id);
});

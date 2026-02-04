import {authorModel} from "../../../models/author.model";
import {defineEventHandler, getRouterParam, sendRedirect} from "h3";
import {adminCheck} from "../../../utils/adminCheck";
import {StatusCodes} from "http-status-codes";

export default defineEventHandler(async (event) => {
  //----> Check for admin privilege.
  if(!adminCheck(event)){
    await sendRedirect(event, '/unauthorized', StatusCodes.FORBIDDEN);
    return;
  }

  //----> Get the author id from param.
  const id = getRouterParam(event, 'id') as string;

  //----> Delete the author by id.
  return authorModel.deleteAuthorById(id);
});

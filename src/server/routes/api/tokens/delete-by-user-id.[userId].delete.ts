import {defineEventHandler, getRouterParam} from "h3";
import {tokenModel} from "../../../models/token.model";

export default defineEventHandler(async (event) => {
  //----> Get the user id from param.
  const userId = getRouterParam(event, 'userId') as string;

  //----> Delete invalid tokens associated with user-id.
  return await tokenModel.deleteInvalidTokensByUserId(userId);
});

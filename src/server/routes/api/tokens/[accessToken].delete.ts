import {defineEventHandler, getRouterParam} from "h3";
import {tokenModel} from "../../../models/token.model";

export default defineEventHandler(async (event) => {
  //----> Get the access-token from param.
  const accessToken = getRouterParam(event, 'accessToken') as string;

  //----> Fetching the token object by access-token.
  return await tokenModel.findTokenByAccessToken(accessToken);
});

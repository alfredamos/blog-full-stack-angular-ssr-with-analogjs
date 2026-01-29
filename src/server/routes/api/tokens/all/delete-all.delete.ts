import {defineEventHandler} from "h3";
import {tokenModel} from "../../../../models/token.model";

export default defineEventHandler(async (event) => {
  //----> Delete all the tokens.
  return await tokenModel.deleteAllInvalidTokens();
});

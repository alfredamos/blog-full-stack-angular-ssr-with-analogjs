import {defineEventHandler, readValidatedBody} from "h3";
import {postSchema} from "../../../validations/post.validation";
import {postModel} from "../../../models/post.model";
import {Post} from "../../../../generated/prisma/client";
import {tokenModel} from "../../../models/token.model";

export default defineEventHandler(async (event) => {
  //----> Delete all the tokens.
  return await tokenModel.deleteAllInvalidTokens();
});

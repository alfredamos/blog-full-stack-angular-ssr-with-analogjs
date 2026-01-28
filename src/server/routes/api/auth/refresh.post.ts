import { defineEventHandler } from 'h3';
import {authModel} from "../../../models/auth.model";

export default defineEventHandler(async (event) => {
  //----> Refresh the user token.
  return authModel.refreshUserToken(event);
});

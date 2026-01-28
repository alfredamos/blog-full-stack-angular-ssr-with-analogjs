import { defineEventHandler } from 'h3';
import {authModel} from "../../../models/auth.model";

export default defineEventHandler(async (event) => {
  //----> Logout the user.
  return authModel.logoutUser(event);
});

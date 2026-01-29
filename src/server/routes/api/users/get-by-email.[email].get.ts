import {defineEventHandler, getRouterParam} from "h3";
import {userModel} from "../../../models/user.model";

export default defineEventHandler(async (event) => {
  //----> Get the user email from param.
  const email = getRouterParam(event, 'email') as string;

  //----> Fetch the user by id.
  return userModel.getUserByEmail(email);
});

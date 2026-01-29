import {defineEventHandler, getRouterParam} from "h3";
import {userModel} from "../../../models/user.model";

export default defineEventHandler(async (event) => {
  //----> Get the user id from param.
  const id = getRouterParam(event, 'id') as string;

  //----> Delete the user by id.
  return userModel.deleteUserById(id);
});

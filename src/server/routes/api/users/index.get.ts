import {defineEventHandler} from "h3";
import {userModel} from "../../../models/user.model";

export default defineEventHandler(async (event) => {
  //----> Fetch all the users.
  return await userModel.getAllUsers();
});

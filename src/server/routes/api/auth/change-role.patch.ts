import {defineEventHandler, readValidatedBody} from 'h3';
import {changeUserRoleSchema} from "../../../validations/auth.validation";
import {prisma} from "../../../db/prisma.db";
import {authModel} from "../../../models/auth.model";

export default defineEventHandler(async (event) => {
  //----> Get the request payload.
  const userRoleChangePayload = await readValidatedBody(event, changeUserRoleSchema.parse);

  //----> Change the user role.
  return await authModel.changeUserRole(userRoleChangePayload, event);
});

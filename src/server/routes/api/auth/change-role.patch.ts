import {defineEventHandler, readValidatedBody, sendRedirect} from 'h3';
import {changeUserRoleSchema} from "../../../validations/auth.validation";
import {prisma} from "../../../db/prisma.db";
import {authModel} from "../../../models/auth.model";
import {adminCheck} from "../../../utils/adminCheck";
import {StatusCodes} from "http-status-codes";

export default defineEventHandler(async (event) => {
  //----> Check for admin privilege.
  if(!adminCheck(event)){
    await sendRedirect(event, '/unauthorized', StatusCodes.FORBIDDEN);
    return;
  }

  //----> Get the request payload.
  const userRoleChangePayload = await readValidatedBody(event, changeUserRoleSchema.parse);

  //----> Change the user role.
  return await authModel.changeUserRole(userRoleChangePayload, event);
});

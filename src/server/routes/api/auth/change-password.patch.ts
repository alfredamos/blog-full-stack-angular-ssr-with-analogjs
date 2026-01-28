import {defineEventHandler, readValidatedBody} from 'h3';
import {changeUserPasswordSchema} from "../../../validations/auth.validation";
import {authModel} from "../../../models/auth.model";

export default defineEventHandler(async (event) => {
  //----> Get the request payload.
  const changeUserPasswordPayload = await readValidatedBody(event, changeUserPasswordSchema.parse);

  //----> Change the user password.
  return await authModel.changeUserPassword(changeUserPasswordPayload);
});

import {defineEventHandler, readValidatedBody} from 'h3';
import {loginUserSchema} from "../../../validations/auth.validation";
import {authModel} from "../../../models/auth.model";

export default defineEventHandler(async(event) => {
  //----> Get the request payload.
  const loginUserPayload = await readValidatedBody(event, loginUserSchema.parse);

  //----> Login the user.
  return await authModel.loginUser(loginUserPayload, event);
});

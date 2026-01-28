import {defineEventHandler, readValidatedBody} from 'h3';
import {signupUserSchema} from "../../../validations/auth.validation";
import {authModel} from "../../../models/auth.model";

export default defineEventHandler(async (event) => {
  //----> Get the request payload.
  const signupUserPayload = await readValidatedBody(event, signupUserSchema.parse);

  //----> Signup the user.
  return await authModel.signupUser(signupUserPayload, event);
});

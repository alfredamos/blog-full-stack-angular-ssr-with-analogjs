import {defineEventHandler, readValidatedBody} from 'h3';
import {editProfileUserSchema} from "../../../validations/auth.validation";
import {authModel} from "../../../models/auth.model";

export default defineEventHandler(async(event) => {
  //----> Get the request payload.
  const editUserProfilePayload = await readValidatedBody(event, editProfileUserSchema.parse);

  //----> Edit the user profile.
  return await authModel.editUserProfile(editUserProfilePayload);
});

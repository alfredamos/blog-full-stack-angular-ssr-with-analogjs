import {H3Event} from "h3";
import {authorModel} from "../models/author.model";
import {authModel} from "../models/auth.model";
import {Role} from "../../app/models/Role";

export async function adminOrOwnerCheckByAuthorId(authorId: string, event: H3Event) {
  //----> Get the user-id from user-session.
  const session = authModel.getSession(event);
  const userIdFromAuth = session?.id as string;

  //----> Get the user from author by authorId.
  const author = await authorModel.getAuthorById(authorId);
  const userIdFromResource = author?.userId;

  //----> Check if the user-id from user-session is the same as the user-id from author.
  const isSameUser = userIdFromAuth.normalize() === userIdFromResource.normalize();

  //----> Check for admin role.
  const isAdmin = session?.role === Role.Admin;

  if (!isAdmin && !isSameUser) {
    return false;
  }

  return true;
}

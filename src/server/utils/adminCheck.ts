import {H3Event} from "h3";
import {authorModel} from "../models/author.model";
import {authModel} from "../models/auth.model";
import {Role} from "../../app/models/Role";

export function adminCheck(event: H3Event) {
  //----> Get the user-id from user-session.
  const session = authModel.getSession(event);

  //----> Check for admin role.
  const isAdmin = session?.role === Role.Admin;

  if (!isAdmin) {
    return false;
  }

  return true;
}

import {inject} from "@angular/core";
import {Role} from "../../app/models/Role";
import {AuthService} from "../services/auth-service";
import {AuthorHttpClientDb} from "../services/author-db-httpClient";

export async function adminOrOwnerCheckByAuthorId(authorId: string) {
  const authService = inject(AuthService);
  const authorDb = inject(AuthorHttpClientDb);
  //----> Get the user-id from user-session.
  const currentUser = authService.userCurrent;
  const userIdFromAuth = currentUser()?.id as string;

  //----> Get the user from author by authorId.
  const author = await authorDb.getAuthorById(authorId);
  const userIdFromResource = author?.userId;

  //----> Check if the user-id from user-session is the same as the user-id from author.
  const isSameUser = userIdFromAuth.normalize() === userIdFromResource.normalize();

  //----> Check for admin role.
  const isAdmin = currentUser()?.role === Role.Admin;

  console.log("In Admin or owner-check, isAdmin : ", isAdmin);
  console.log("In Admin or owner-check, isSame : ", isSameUser);

  if (!isAdmin && !isSameUser) {
    return false;
  }

  return true;
}

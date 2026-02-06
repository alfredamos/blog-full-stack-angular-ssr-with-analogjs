import {Injectable, inject, computed} from "@angular/core"
import {AuthService} from "./auth-service";
import {AuthorHttpClientDb} from "./author-db-httpClient";
import {Role} from "../models/Role";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root',
})
export class AdminOrOwnerCheckService {
  authService = inject(AuthService);
  authorDb = inject(AuthorHttpClientDb);

  checkAdminOrOwner(userId: string){
    return this.authService.isAdmin() || this.authService.userCurrent()?.id === userId;
  }

  isAuthor(userId: string){
    const currentUser = this.authService.userCurrent;

    return currentUser()?.id?.normalize() === userId?.normalize();

  }

  async checkOwnerAndAdminByAuthorId(authorId: string){
    const currentUser = this.authService.userCurrent;
    const userIdFromAuth = currentUser()?.id as string;

    //----> Get the user from author by authorId.
    const author = await this.authorDb.getAuthorById(authorId);
    const userIdFromResource = author?.userId;

    //----> Check if the user-id from user-session is the same as the user-id from author.
    const isSameUser = userIdFromAuth.normalize() === userIdFromResource.normalize();

    //----> Check for admin role.
    const isAdmin = currentUser()?.role === Role.Admin;

    if (!isAdmin && !isSameUser) {
      return false
    }

    return true;
  }
}

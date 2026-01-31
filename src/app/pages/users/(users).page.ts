import {Component, inject, OnInit} from "@angular/core";
import {UserTable} from "../../components/users/user-table/user-table";
import {AuthDb} from "../../services/auth-db";
import {UserDb} from "../../services/user-db";
import {UserService} from "../../services/user-service";
import {User} from "../../models/User";
import { RouteMeta } from '@analogjs/router';
import {authGuard} from "../../guards/authGuard.guard"
import {adminGuard} from "../../guards/adminGuard.guard"

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, adminGuard],
};

@Component({
  selector: "app-users-list-page",
  standalone: true,
  imports: [
    UserTable
  ],
  template: `
    <app-user-table
      [users]="userService.users()"
      (onChangeRole)="changeRole($event)"
    />`
})
export default class UsersPage implements OnInit {
  authDb = inject(AuthDb);
  userDb = inject(UserDb)
  userService = inject(UserService);

  ngOnInit(): void {
    this.userDb.getUsers().then(() => {
    }).catch(console.error);
  }

  async changeRole(user: User) {
    await this.authDb.changeUserRole({email: user.email})
    this.userDb.getUsers().then(() => {
    }).catch(console.error);
  }
}

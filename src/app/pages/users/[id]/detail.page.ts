import {Component} from "@angular/core";
import {DetailUser} from "../../../components/users/detail-user/detail-user";
import { RouteMeta } from '@analogjs/router';
import {authGuard} from "../../guards/authGuard.guard"

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: "app-detail-user-page",
  standalone: true,
  imports: [DetailUser],
  template: `<app-user-detail/>`
})
export default class UserDetailPage{

}

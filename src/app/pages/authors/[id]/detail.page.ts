import {Component} from "@angular/core";
import {DetailUser} from "../../../components/users/detail-user/detail-user";

@Component({
  selector: "app-detail-author-page",
  standalone: true,
  imports: [
    DetailUser
  ],
  template: `
    <app-user-detail/>`
})
export default class DeleteAuthorPage {}

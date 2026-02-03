import {Component} from "@angular/core";
import {Unauthorized} from "../../components/auth/unauthorized/unauthorized";

@Component({
  selector: 'app-route-unauthorized-page',
  imports: [Unauthorized],
  template: ` <app-unauthorized /> `,
})
export default class UnauthorizedPage {}

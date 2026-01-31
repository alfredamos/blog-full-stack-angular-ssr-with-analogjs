import {Component} from "@angular/core";
import {LoginForm} from "../../components/auth/login-form/login-form";
import {Unauthorized} from "../../components/auth/unauthorized/unauthorized";

@Component({
  selector: 'app-route-unauthorized-page',
  standalone: true,
  imports: [
    Unauthorized
  ],
  template: `
    <app-unauthorized-page/>
    `
})
export default class UnauthorizedPage{}

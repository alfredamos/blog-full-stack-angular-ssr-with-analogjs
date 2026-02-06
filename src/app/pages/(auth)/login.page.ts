import {Component, inject, OnInit} from "@angular/core";
import {LoginUserModel} from "../../models/auth/LoginUserModel";
import {Router} from "@angular/router";
import {LoginForm} from "../../components/auth/login-form/login-form";
import { AuthHttpClientDb } from "../../services/auth-db-httpClient";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    LoginForm
  ],
  template: `
    <app-login-form (onBack)="backToList()"
                    (onLogin)="submitLoginForm($event)"/>`
})
export default class LoginPage{
  authDb = inject(AuthHttpClientDb)
  router = inject(Router)

  async backToList() {
    await this.router.navigate(["/"])
  }

  async submitLoginForm(loginUserModel: LoginUserModel) {
    await this.authDb.loginUser(loginUserModel);
    await this.router.navigate(["/"])
  }
}

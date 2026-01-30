import {Component, inject} from "@angular/core";
import {LoginUserModel} from "../../models/auth/LoginUserModel";
import {AuthDb} from "../../services/auth-db";
import {Router} from "@angular/router";
import {LoginForm} from "../../components/auth/login-form/login-form";

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
  authDb = inject(AuthDb)
  router = inject(Router)

  async backToList() {
    await this.router.navigate(["/"])
  }

  async submitLoginForm(loginUserModel: LoginUserModel) {
    await this.authDb.loginUser(loginUserModel);
    await this.router.navigate(["/"])
  }
}

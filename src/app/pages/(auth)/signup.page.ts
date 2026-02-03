import {Component, inject} from "@angular/core";
import {Router} from "@angular/router";
import {SignupUserModel} from "../../models/auth/SignupUserModel";
import {SignupForm} from "../../components/auth/signup-form/signup-form";
import { AuthHttpClientDb } from "../../services/auth-db-httpClient";

@Component({
  selector: "app-signup-page",
  standalone: true,
  imports: [
    SignupForm
  ],
  template: `
    <app-signup-form (onSignup)="onSignupForm($event)"
                     (onBackToList)="backToList()"/>`
})
export default class SignupPage {
  authDb = inject(AuthHttpClientDb)
  router = inject(Router)

  async onSignupForm(signupUserModel: SignupUserModel) {
    await this.authDb.signupUser(signupUserModel)
    await this.router.navigate(['/']);
  }

  async backToList() {
    await this.router.navigate(['/']);
  }
}

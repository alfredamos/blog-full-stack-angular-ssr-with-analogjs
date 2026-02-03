import {Component, inject} from "@angular/core";
import {ChangePasswordForm} from "../../components/auth/change-password-form/change-password-form";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth-service";
import {ChangeUserPasswordModel} from "../../models/auth/ChangeUserPasswordModel";
import { RouteMeta } from '@analogjs/router';
import {authGuard} from "../../guards/authGuard.guard"
import { AuthHttpClientDb } from "../../services/auth-db-httpClient";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: 'app-change-password-page',
  standalone: true,
  imports: [
    ChangePasswordForm
  ],
  template: `
    <app-change-password-form
      [email]="authService.email()"
      (onChangeUserPassword)="onSubmit($event)"
      (onBackToList)="bacKToList()"
    />`
})
export default class ChangePasswordPage{
  router = inject(Router);
  authDb = inject(AuthHttpClientDb);
  authService = inject(AuthService);

  async onSubmit(changeUserPasswordModel: ChangeUserPasswordModel) {
    await this.authDb.changeUserPassword(changeUserPasswordModel)
    await this.router.navigate(['/']);
  }

  async bacKToList() {
    await this.router.navigate(["/"])
  }
}

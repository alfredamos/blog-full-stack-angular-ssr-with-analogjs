import {Component, inject, OnChanges, OnInit, signal, SimpleChanges} from "@angular/core";
import {User} from "../../models/User";
import {AuthService} from "../../services/auth-service";
import {Router} from "@angular/router";
import {EditProfileForm} from "../../components/auth/edit-profile-form/edit-profile-form";
import {EditUserProfileModel} from "../../models/auth/EditUserProfileModel";
import {authGuard} from "../../guards/authGuard.guard"
import { RouteMeta } from "@analogjs/router";
import { AuthHttpClientDb } from "../../services/auth-db-httpClient";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: 'app-edit-profile-page',
  standalone: true,
  imports: [
    EditProfileForm
  ],
  template: `
    <app-edit-profile-form [user]="user()" (onBackToList)="backToList()"
                           (onEditProfile)="onSubmitEditProfileForm($event)"/>`
})
export default class EditProfilePage implements OnInit, OnChanges{
  user = signal<User>(new User());

  authDb = inject(AuthHttpClientDb);
  authService = inject(AuthService);

  router = inject(Router);

  async ngOnInit() {
    const user = await this.loadUser();
    console.log("In ng-on-init, user", user);
    this.user.set(user);
  }

  async ngOnChanges(_changes: SimpleChanges) {
    const user = await this.loadUser();

    this.user.set(user);
  }

  async loadUser(){
    const userFromStore = this.authService.userCurrent();
    const userFromDb = await this.authDb.getCurrentUser();

    return userFromDb ?? userFromStore;
  }

  async backToList() {
    await this.router.navigate(["/"])
  }

  async onSubmitEditProfileForm(editUserProfileModel: EditUserProfileModel) {
    await this.authDb.editProfileUser(editUserProfileModel);
    await this.router.navigate(['/']);
  }
}

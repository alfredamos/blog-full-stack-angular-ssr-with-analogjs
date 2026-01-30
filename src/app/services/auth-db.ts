import {inject, Injectable, signal} from '@angular/core';
import {AuthService} from './auth-service';
import {ApiClientService} from './api-client-service';
import {UserSession} from "../models/auth/UserSession";
import {ResponseMessage} from "../models/ResponseMessage";
import {User} from "../models/User";
import {LoginUserModel} from "../models/auth/LoginUserModel";
import {ChangeUserPasswordModel} from "../models/auth/ChangeUserPasswordModel";
import {EditUserProfileModel} from "../models/auth/EditUserProfileModel";
import {ChangeUserRole} from "../models/auth/ChangeUserRole";
import {UserService} from "./user-service";
import {SignupUserModel} from "../models/auth/SignupUserModel";



@Injectable({
  providedIn: 'root',
})
export class AuthDb {
  public data = signal<UserSession | ResponseMessage | User | null>(null);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  private apiClientService = inject(ApiClientService) as ApiClientService<LoginUserModel | ChangeUserPasswordModel | EditUserProfileModel | ChangeUserRole | null> ;
  private authService = inject(AuthService);
  private userService = inject(UserService);

  async changeUserPassword(changeUserPasswordModel: ChangeUserPasswordModel){
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.patch<ResponseMessage>('/auth/changeUserPassword', changeUserPasswordModel);
      this.data.set(response.data);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async changeUserRole(changeRoleOfUser: ChangeUserRole){
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.patch<ResponseMessage>("/auth/change-role", changeRoleOfUser);
      this.data.set(response.data);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async editProfileUser(editUserProfileModel: EditUserProfileModel){
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.patch<ResponseMessage>("/auth/edit-profile", editUserProfileModel);
      this.data.set(response.data);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async loginUser(loginUser: LoginUserModel){
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.post<UserSession>('/auth/login', loginUser);
      this.updateSession(response.data)
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }

  }

  updateSession(session: UserSession){
    this.data.set(session);
    this.authService.setSession(session)
    this.authService.setLocalStorage(session);
  }

  async logoutUser(){
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.post<UserSession>("/auth/logout", null);
      this.data.set(response.data);
      this.removeStoresAndLocalStorages();
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }

  }

  async getCurrentUser(){
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.get<User>("/auth/me");
      this.updateCurrentUser(response.data)
      return response.data
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  removeStoresAndLocalStorages(){
    this.authService.removeSession();
    // this.customerService.removeCustomers();
    // this.ticketService.removeTickets();
    // this.userService.removeUsers();
  }

  async signupUser(signupUser: SignupUserModel){
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.post<ResponseMessage>("auth/signup", signupUser);
      this.data.set(response.data);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }

  }

  async refreshUserToken() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.post<UserSession>("/auth/refresh", null);
      this.updateSession(response.data)
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  updateCurrentUser(user: User){
    this.data.set(user);
    this.authService.updateCurrentUser(user);
    this.authService.setCurrentUserLocalStorage(user);
  }

}

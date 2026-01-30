import {inject, Injectable, signal} from '@angular/core';
import {UserService} from './user-service';
import {User} from '../models/User';
import {ApiClientService} from './api-client-service';

@Injectable({
  providedIn: 'root',
})
export class UserDb {
  public data = signal<User[]>([]);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  apiClientService = inject(ApiClientService) as ApiClientService<User>;
  userService = inject(UserService);

  async getUsers() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.get<User[]>("/users");
      console.log(response.data)
      this.updateUsers(response.data);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteUserById(id: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.delete<User>(`/users/${id}`);
      const newUsers = this.userService.users()?.filter(user => user.id !== response.data.id);
      this.updateUsers(newUsers);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async getUserById(id: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.get<User>(`/users/${id}`);
      return response.data
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  async getUserByEmail(email: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.get<User>(`/users/get-user-by-email/${email}`);
      return response.data
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  private updateUsers(newUsers: User[]) {
    //const newUsers = this.userService.users()?.filter(user => user.id !== userData.id);
    this.data.set(newUsers);
    this.userService.updateUsers(newUsers);
    this.userService.setLocalStorage(newUsers);
  }

}

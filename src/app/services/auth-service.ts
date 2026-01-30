import {computed, inject, Injectable, signal} from '@angular/core';
import {BrowserStorageService} from './browser-storage-service';
import {UserSession} from '../models/auth/UserSession';
import {User} from '../models/User';
import {LocalStorageKey} from '../models/LocalStorageKey';
import {initialUserSession} from "./initialUserSession";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authRes = signal<UserSession>(new UserSession())
  private currentUser = signal<User>(new User());

  authSession = this.authRes.asReadonly();
  accessToken = computed(() => this.authSession()?.accessToken || this.getLocalStorage()?.accessToken)
  isAdmin = computed(() => this.authSession()?.isAdmin || this.getLocalStorage()?.isAdmin);
  isLoggedIn = computed(() => this.authSession()?.isLoggedIn || this.getLocalStorage()?.isLoggedIn);
  email = computed(() => this.authSession()?.email || this.getLocalStorage()?.email);
  userCurrent = computed(() => this.currentUser() || this.getCurrentUserLocalStorage());

  storageService = inject(BrowserStorageService);

  setSession(userSession: UserSession){
    this.authRes.set(userSession);

  }

  removeSession(){
    this.authRes.set(initialUserSession);
    this.removeCurrentUser();
    this.removeCurrentUserLocalStorage();
    this.removeStorage();
  }

  setLocalStorage(session: UserSession){
    //localStorage.setItem(LocalStorageKey.authKey, JSON.stringify(session));
    this.storageService.set(LocalStorageKey.authKey, JSON.stringify(session));
  }

  getLocalStorage(){
    return JSON.parse(this.storageService.get(LocalStorageKey.authKey) as string ) as UserSession;
    //return JSON.parse(localStorage.getItem(LocalStorageKey.authKey) as string) as UserSession;
  }

  removeStorage(){
    this.storageService.remove(LocalStorageKey.authKey);
    //localStorage.removeItem(LocalStorageKey.authKey);
  }

  updateCurrentUser(user: User){
    this.currentUser.set(user);
  }

  removeCurrentUser(){
    this.currentUser.set(new User())
  }

  setCurrentUserLocalStorage(user: User){
    this.storageService.set(LocalStorageKey.currentUserKey, JSON.stringify(user));
    //localStorage.setItem(LocalStorageKey.currentUserKey, JSON.stringify(user));
  }

  getCurrentUserLocalStorage(){
    return JSON.parse(this.storageService.get(LocalStorageKey.currentUserKey) as string) as User;
    //return JSON.parse(localStorage.getItem(LocalStorageKey.currentUserKey) as string) as User;
  }

  removeCurrentUserLocalStorage(){
    this.removeCurrentUser()
    //localStorage.removeItem(LocalStorageKey.currentUserKey)
    this.storageService.remove(LocalStorageKey.currentUserKey);
  }
}

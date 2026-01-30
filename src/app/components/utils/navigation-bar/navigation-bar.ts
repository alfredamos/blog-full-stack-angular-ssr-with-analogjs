import {Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';
import {SettingsDropDown} from '../settings-drop-down/settings-drop-down';
import {AdminDropDown} from '../admin-drop-down/admin-drop-down';
import {AuthDb} from "../../../services/auth-db";
import {AuthService} from "../../../services/auth-service";

@Component({
  selector: 'app-navigation-bar',
  imports: [
    NgClass,
    RouterLink,
    SettingsDropDown,
    AdminDropDown
  ],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
  standalone: true
})
export class NavigationBar{
  authDb = inject(AuthDb)
  authService = inject(AuthService);

  isMenuOpen = false;



  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  async onLogout() {
    await this.authDb.logoutUser()
  }

  async refreshUserToken(){
    await this.authDb.refreshUserToken()
  }
}

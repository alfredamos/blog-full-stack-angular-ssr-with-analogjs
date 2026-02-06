import {Component, computed, inject, input, OnInit, output, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth-service";
import {PostHttpClientDb} from "../../../services/post-db-httpClient";
import {AuthHttpClientDb} from "../../../services/auth-db-httpClient";

@Component({
  selector: 'app-settings-drop-down',
    imports: [
        RouterLink
    ],
  templateUrl: './settings-drop-down.html',
  styleUrl: './settings-drop-down.css',
})
export class SettingsDropDown implements OnInit{
  idOfUser = signal("")
  authService = inject(AuthService);
  authDb = inject(AuthHttpClientDb)
  userId = computed(() =>  this.authService.userCurrent()?.id as string);

  onRefreshUserToken = output<void>();

  async ngOnInit(){
    const userId = await this.getCurrentUser();
    this.idOfUser.set(userId);
  }

  refreshUserToken() {
    this.onRefreshUserToken.emit();
  }

  async getCurrentUser(){
    const currentUser = await this.authDb.getCurrentUser();

    return this.userId() ?? currentUser?.id
  }
}

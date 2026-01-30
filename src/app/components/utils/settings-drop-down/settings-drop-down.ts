import {Component, computed, inject, input, output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth-service";

@Component({
  selector: 'app-settings-drop-down',
    imports: [
        RouterLink
    ],
  templateUrl: './settings-drop-down.html',
  styleUrl: './settings-drop-down.css',
})
export class SettingsDropDown {
  authService = inject(AuthService);
  email = computed(() =>  decodeURIComponent(this.authService.email()))

  onRefreshUserToken = output<void>();

  refreshUserToken() {
    this.onRefreshUserToken.emit();
  }
}

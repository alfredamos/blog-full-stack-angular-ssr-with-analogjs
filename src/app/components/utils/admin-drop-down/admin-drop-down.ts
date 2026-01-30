import {Component, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from "../../../services/auth-service";

@Component({
  selector: 'app-admin-drop-down',
  imports: [
    RouterLink
  ],
  templateUrl: './admin-drop-down.html',
  styleUrl: './admin-drop-down.css',
})
export class AdminDropDown {
  authService = inject(AuthService);
}

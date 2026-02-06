import {inject} from "@angular/core";
import {AuthService} from "../services/auth-service";

export function isAnAdmin() {
  const authService = inject(AuthService);
  return authService.isAdmin;
}

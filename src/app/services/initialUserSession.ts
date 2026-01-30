import {UserSession} from '../models/auth/UserSession';
import {Role} from '../models/Role';

export const initialUserSession : UserSession = {
  accessToken: "",
  id: "",
  isAdmin: false,
  isLoggedIn: false,
  name: "",
  email: "",
  role: Role.User
}

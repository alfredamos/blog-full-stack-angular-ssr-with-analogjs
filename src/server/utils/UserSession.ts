import {Role} from "../../generated/prisma/enums";

export class UserSession {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: Role,
    public accessToken: string,
    public isAdmin: boolean,
    public isLoggedIn: boolean,
  ) {}
}

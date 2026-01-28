import {Role} from "../../generated/prisma/enums";

export class TokenJwt {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: Role,
  ) {}
}

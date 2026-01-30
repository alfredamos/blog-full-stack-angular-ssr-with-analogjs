import {Role} from "../../app/models/Role";
import {Author} from "../../app/models/Author";

export class User{
  id: string = "";
  name: string = "";
  email: string = "";
  password: string = "";
  image: string = "";
  role: Role = Role.User;
  author: Author | null = null;
}

import {Gender} from './Gender';
import {Role} from './Role';
import {Author} from "./Author";

export class User{
  id?: string = "";
  name: string = "";
  email: string = "";
  phone: string = "";
  gender:   Gender = Gender.Male;
  role: Role = Role.User;
  image: string = "";
  author: Author = new Author();
}

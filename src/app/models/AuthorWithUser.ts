import {Author} from "./Author";
import {User} from "./User";

export class AuthorWithUser extends Author{
  user: User = new User();
}

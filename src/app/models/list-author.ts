import {Gender} from "./Gender";
import {PostDto} from "./post-dto";

export class AuthorWithPosts {
  id: string = "";
  address: string = "";
  name: string = "";
  email: string = "";
  phone: string = "";
  dateOfBirth: string | Date = new Date();
  image: string = "";
  userId: string = "";
  age: number = 0;
  gender: Gender = Gender.Male;
  posts: PostDto[] = [];
}

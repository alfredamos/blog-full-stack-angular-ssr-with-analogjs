import {Gender} from "./Gender";
import {AuthorWithPosts} from "./list-author";

export class Author {
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
}

export function getAuthor(author: AuthorWithPosts): Author {
  return {
    id: author.id,
    address: author.address,
    name: author.name,
    email: author.email,
    phone: author.phone,
    dateOfBirth: author.dateOfBirth,
    image: author.image,
    userId: author.userId,
    age: author.age,
    gender: author.gender
  }
}

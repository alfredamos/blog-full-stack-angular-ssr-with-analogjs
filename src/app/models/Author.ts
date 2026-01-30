import {Gender} from "./Gender";

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

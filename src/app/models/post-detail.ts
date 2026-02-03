import {Author} from "./Author";

export class PostDetail {
  id: string = "";
  content: string = "";
  title: string = "";
  imageUrl?: string = "";
  dateAndTime: string | Date = new Date();
  author: Author = new Author();
}

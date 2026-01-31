import {Author} from "./Author";

export class PostDto {
  id: string = "";
  content: string = "";
  title: string = "";
  dateAndTime: string | Date = new Date();
  authorId: string = "";
}

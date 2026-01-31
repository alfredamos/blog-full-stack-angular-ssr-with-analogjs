import { Author } from './Author';

export class Post {
  id: string = '';
  content: string = '';
  title: string = '';
  dateAndTime: string | Date = new Date();
  author: Author = new Author();
}

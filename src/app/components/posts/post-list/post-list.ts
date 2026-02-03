import {Component, input} from '@angular/core';
import {Post} from "../../../models/list-post"
import {RouterLink} from "@angular/router";
import {BlogContent} from "../blog-content/blog-content";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-post-list',
  imports: [
    RouterLink,
    BlogContent,
    DatePipe,
  ],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList {
  authorsWithPosts = input.required<Post[]>();

}

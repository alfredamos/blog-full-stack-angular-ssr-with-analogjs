import {Component} from "@angular/core";
import {AllPosts} from "../../components/posts/all-posts/all-posts";

@Component({
  selector: "app-posts-list-page",
  standalone: true,
  imports: [
    AllPosts
  ],
  template: `
    <app-all-posts/>`
})
export default class PostsPage {}

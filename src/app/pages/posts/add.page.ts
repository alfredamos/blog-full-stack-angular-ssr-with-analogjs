import {Component, inject} from "@angular/core";
import {PostAdd} from "../../components/posts/post-add/post-add";
import {PostHttpClientDb} from "../../services/post-db-httpClient";
import {Router} from "@angular/router";
import {CreatePost} from "../../models/create-post";
import {RouteMeta} from "@analogjs/router";
import {authGuard} from "../../guards/authGuard.guard";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: "app-add-post-page",
  standalone: true,
  imports: [
    PostAdd
  ],
  template: `
    <app-post-add
      (onBackToPosts)="backToPosts()"
      (onPostCreated)="createdPost($event)"
    />`
})
export default class AddPostPage {
  postDb = inject(PostHttpClientDb);
  router = inject(Router);

  backToPosts() {
    this.router.navigate(['/posts']).catch(console.error);
  }

  async createdPost(post: CreatePost) {
    console.log("In add-post-page, post", post);
    await this.postDb.createPost(post);
    this.router.navigate(['/posts']).catch(console.error);
  }
}

import {Component, inject, OnInit, signal} from "@angular/core";
import { RouteMeta } from '@analogjs/router';
import { authGuard } from "../../../guards/authGuard.guard";
import {Post} from "../../../models/list-post";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BlogContent} from "../../../components/posts/blog-content/blog-content";
import {DatePipe} from "@angular/common";
import {AuthorHttpClientDb} from "../../../services/author-db-httpClient";
import {PostHttpClientDb} from "../../../services/post-db-httpClient";
import {AdminOrOwnerCheckService} from "../../../services/adminOrOwnerCheck.service";
import {PostDto} from "../../../models/post-dto";
import {PostDetail} from "../../../models/post-detail";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: "app-edit-post-page",
  standalone: true,
  imports: [
    RouterLink,
    BlogContent,
    DatePipe,
  ],
  templateUrl: "post-edit.html"
})
export default class EditPostPage implements OnInit{
  id = "";
  isEdit = true;
  post = signal<PostDetail>(new PostDetail());

  authorDb = inject(AuthorHttpClientDb);

  isOwner = inject(AdminOrOwnerCheckService);

  postDb = inject(PostHttpClientDb)

  router = inject(Router);
  route = inject(ActivatedRoute);

  async ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    const onePost = await this.loadPost(this.id);

    const author = await this.loadAuthor(onePost.author?.id);

    const isAuthor = await this.isOwner.isAuthor(author.userId);

    const post = {...onePost, author, isAuthor};

    this.post.set(post);

  }

  async loadAuthor(id: string) {
    return await this.authorDb.getAuthorById(id);
  }

  async loadPost(id: string) {
    return await this.postDb.getPostById(id);
  }

  backToPosts() {
    this.router.navigate(['/posts']).then().catch(console.error);
  }

  async changeContent(content: string) {
    const post = {...this.post(), content};
    const editedPost = this.makePost(post);

    await this.postDb.editPostById(this.id, editedPost);
    this.router.navigate(['/posts']).then().catch(console.error);
  }

  makePost(post: Post): PostDto{
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      authorId: post.author.id,
      dateAndTime: post.dateAndTime,


    }
  }
}

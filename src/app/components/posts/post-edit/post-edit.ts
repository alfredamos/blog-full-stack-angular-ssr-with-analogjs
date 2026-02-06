import {Component, inject, signal} from '@angular/core';
import {PostDetail} from "../../../models/post-detail";
import {AuthorHttpClientDb} from "../../../services/author-db-httpClient";
import {AdminOrOwnerCheckService} from "../../../services/adminOrOwnerCheck.service";
import {PostHttpClientDb} from "../../../services/post-db-httpClient";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../../models/list-post";
import {PostDto} from "../../../models/post-dto";
import {Unauthorized} from "../../auth/unauthorized/unauthorized";
import {BlogContent} from "../blog-content/blog-content";

@Component({
  selector: 'app-post-edit',
  imports: [
    Unauthorized,
    BlogContent
  ],
  templateUrl: './post-edit.html',
  styleUrl: './post-edit.css',
  standalone: true
})
export class PostEdit {
  id = "";
  isNotAuthor = false;
  isEdit = true;
  idOfAuthor = signal<string>("");
  post = signal<PostDetail>(new PostDetail());

  authorDb = inject(AuthorHttpClientDb);

  isOwnerOrAdmin = inject(AdminOrOwnerCheckService)
  postDb = inject(PostHttpClientDb)

  router = inject(Router);
  route = inject(ActivatedRoute);

  async ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    const onePost = await this.loadPost(this.id);

    const author = await this.loadAuthor(onePost.author?.id);

    this.idOfAuthor.set(author.id);

    const post = {...onePost, author: author};

    this.post.set(post);

    if (!await this.isOwnerOrAdmin.checkOwnerAndAdminByAuthorId(this.idOfAuthor())){
      this.isNotAuthor= true;
      this.router.navigate(['/unauthorized']).then().catch(console.error);
      return;
    }
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

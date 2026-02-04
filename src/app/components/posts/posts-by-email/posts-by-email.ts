import {Component, computed, inject, OnInit, signal, input} from '@angular/core';
import {AuthorHttpClientDb} from "../../../services/author-db-httpClient";
import {PostList} from "../post-list/post-list";
import {Post} from "../../../models/list-post";


@Component({
  selector: 'app-posts-by-email',
  imports: [ PostList],
  templateUrl: './posts-by-email.html',
  styleUrl: './posts-by-email.css',
})
export class PostsByEmail implements OnInit{
  email = input.required<string>();

  posts = signal<Post[]>([]);

  authorDb = inject(AuthorHttpClientDb)


  async ngOnInit() {
    const email = this.email();
    const [author, authorWithPosts]= await Promise.all([this.loadAuthorByEmail(email), await this.loadAuthorWithPosts(email)])

    const posts = authorWithPosts.posts.map(post => ({...post, author:author}));

    this.posts.set(posts);
  }

  async loadAuthorWithPosts(email:string){
    return await this.authorDb.getPostsWithAuthorByEmail(email);
  }

  async loadAuthorByEmail(email:string){
    return await this.authorDb.getAuthorByEmail(email);
  }

}

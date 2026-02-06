import {Component, inject, OnInit, signal} from '@angular/core';
import {Post} from "../../../models/list-post";
import {PostList} from "../post-list/post-list";
import {AuthorHttpClientDb} from "../../../services/author-db-httpClient";
import {AuthorWithPosts} from "../../../models/list-author";
import {AdminOrOwnerCheckService} from "../../../services/adminOrOwnerCheck.service";

@Component({
  selector: 'app-all-posts',
  imports: [
    PostList,
  ],
  templateUrl: './all-posts.html',
  styleUrl: './all-posts.css',
})
export class AllPosts implements OnInit{
  authorsWithPosts = signal<Post[]>([]);

  authorDb = inject(AuthorHttpClientDb);

  isOwnerOrAdmin = inject(AdminOrOwnerCheckService)

  async ngOnInit() {
    const authorsWithPost = await this.loadAuthors();
    const allPostsWithAuthors = authorsWithPost.map(authorWithIsAuthor => {
      const {author, isAuthor} = authorWithIsAuthor;
      const posts = author.posts;

      return posts.map(post =>{
        return {...post, author, isAuthor};
      });

    });
    const flatMapAuthorsWithPosts = allPostsWithAuthors.flatMap(postsWithAuthors => postsWithAuthors.map(postsWithAuthor => ({...postsWithAuthor})));

    this.authorsWithPosts.set(flatMapAuthorsWithPosts);
  }

  async loadAuthors() {
    const authors = await this.authorDb.getAuthors();

    return authors.map((author) => {
      const isAuthor = this.isOwnerOrAdmin.isAuthor(author.userId);

      return {author: author, isAuthor: isAuthor} as { author: AuthorWithPosts, isAuthor: boolean };
    });
  }


}

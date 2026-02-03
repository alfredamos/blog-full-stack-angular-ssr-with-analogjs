import {Component, inject, OnInit, signal} from '@angular/core';
import {Post} from "../../../models/list-post";
import {AuthorService} from "../../../services/author-service";
import {PostList} from "../post-list/post-list";
import {AuthorHttpClientDb} from "../../../services/author-db-httpClient";
import {Author, getAuthor as getOneAuthor} from "../../../models/Author";
import {AuthorWithPosts} from "../../../models/list-author";

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
  authorService = inject(AuthorService);

  async ngOnInit() {
    const authorsWithPost = await this.loadAuthors();
    const allPostsWithAuthors = authorsWithPost.map(author => {
      const posts = author.posts;
      const oneAuthor = this.getAuthor(author)
      const postsWithAuthor = posts.map(post => ({...post, author:oneAuthor}));
      return postsWithAuthor;
    })
    const flatMapAuthorsWithPosts = allPostsWithAuthors.flatMap(postsWithAuthors => postsWithAuthors.map(postsWithAuthor => ({...postsWithAuthor})));

    this.authorsWithPosts.set(flatMapAuthorsWithPosts);
  }

  getAuthor = (author: AuthorWithPosts) => getOneAuthor(author);


  async loadAuthors() {
    const authorsFromDb = await this.authorDb.getAuthors();
    const authorsFromStore = this.authorService.authors();

    return authorsFromStore ?? authorsFromDb;
  }


}

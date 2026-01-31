import {Component, inject, OnChanges, OnInit, signal, SimpleChanges} from '@angular/core';
import {Post} from "../../../models/list-post";
import {PostDb} from "../../../services/post-db";
import {PostService} from "../../../services/post-service";
import {AuthorDb} from "../../../services/author-db";
import {AuthorService} from "../../../services/author-service";
import {PostList} from "../post-list/post-list";

@Component({
  selector: 'app-all-posts',
  imports: [
    PostList,
  ],
  templateUrl: './all-posts.html',
  styleUrl: './all-posts.css',
})
export class AllPosts implements OnInit{

  posts = signal<Post[]>([]);

  authorDb = inject(AuthorDb);
  authorService = inject(AuthorService);

  postDb = inject(PostDb);
  postService = inject(PostService);

  async ngOnInit() {
    const posts = await this.loadPosts();
    const allPost = posts.map(async (post) => {
      const author = await this.getAuthor(post.authorId);
      const postWithAuthor: Post = {...post, author};
      return postWithAuthor;

    })

    this.posts.set(await Promise.all(allPost));
  }



  async loadPosts() {
    const postsFromDb = await this.postDb.getPosts();
    const postsFromStore = this.postService.posts();

    return postsFromStore ?? postsFromDb;
  }

  async getAuthor(id: string) {
    const authorFromStore = this.authorService.findAuthorById(id);
    const authorFromDb = await this.authorDb.getAuthorById(id);

    return authorFromStore ?? authorFromDb;
  }


}

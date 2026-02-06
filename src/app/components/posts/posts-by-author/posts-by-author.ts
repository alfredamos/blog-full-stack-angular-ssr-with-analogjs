import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {AuthService} from "../../../services/auth-service";
import {AuthorHttpClientDb} from "../../../services/author-db-httpClient";
import {AdminOrOwnerCheckService} from "../../../services/adminOrOwnerCheck.service"
import {PostList} from "../post-list/post-list";
import {Post} from "../../../models/list-post";

@Component({
  selector: 'app-posts-by-author',
  imports: [
    PostList
  ],
  templateUrl: './posts-by-author.html',
  styleUrl: './posts-by-author.css',
  standalone: true
})
export class PostsByAuthor implements OnInit {
  posts = signal<Post[]>([]);

  authService = inject(AuthService);

  isOwnerCheck = inject(AdminOrOwnerCheckService)

  userId = computed(() => this.authService.userCurrent()?.id as string);

  authorDb = inject(AuthorHttpClientDb)


  async ngOnInit() {
    const [author, authorWithPosts]= await Promise.all([this.loadAuthorByUserId(this.userId()), await this.loadAuthorWithPosts(this.userId())])

    const posts = authorWithPosts.posts.map(post => {
      const isAuthor = this.isOwnerCheck.isAuthor(this.userId());
      return {...post, author, isAuthor}
    });

    this.posts.set(posts);
  }

  async loadAuthorWithPosts(userId:string){
    return await this.authorDb.getPostsWithAuthorByUserId(userId);
  }

  async loadAuthorByUserId(userId:string){
    return await this.authorDb.getAuthorByUserId(userId);
  }

}

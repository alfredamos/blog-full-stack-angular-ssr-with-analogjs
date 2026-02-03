import {inject, Injectable, signal} from '@angular/core';
import {PostDto} from "../models/post-dto";
import {PostService} from "./post-service";
import { ApiHttpClientService } from './api-http-client-service';
import {Post} from "../models/list-post";
import {CreatePost} from "../models/create-post";
import {PostDetail} from "../models/post-detail";

@Injectable({
  providedIn: 'root',
})
export class PostHttpClientDb {
  public data = signal<Post[]>([]);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  postService = inject(PostService);
  apiHttpClientService = inject(ApiHttpClientService) as ApiHttpClientService<PostDto| CreatePost | null>;

  async getPosts() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.get<Post[]>("/posts");
      console.log("In post-db-http-client, posts", response)
      this.updatePosts(response);
      return response;
    } catch (err: any) {
      console.log("In post-db-get-all-posts, errorMessage", err.message)
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);

    }
  }

  async getPostById(id: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.get<PostDetail>(`/posts/${id}`);
      return response;
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  async deletePostById(id: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.delete<Post>(`/posts/${id}`);
      const newPosts = this.postService.posts()?.filter(post => post.id !== response.id);
      this.updatePosts(newPosts);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async editPostById(id: string, post: PostDto) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.patch<Post>(`/posts/${id}`, post);
      const newPosts = this.postService.posts()?.map(post => post.id === response.id ? response : post);
      this.updatePosts(newPosts);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  private updatePosts(newPosts: Post[]) {
    this.data.set(newPosts);
    this.postService.updatePosts(newPosts);
    this.postService.setLocalStorage(newPosts);
  }

  async createPost(post: CreatePost) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.post<Post>(`/posts`, post);
      const newPosts = [...this.postService.posts(), response];
      this.updatePosts(newPosts);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }
}

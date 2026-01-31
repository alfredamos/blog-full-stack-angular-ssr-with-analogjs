import {inject, Injectable, signal} from '@angular/core';
import {PostDto} from "../models/post-dto";
import {PostService} from "./post-service";
import { ApiHttpClientService } from './api-http-client-service';

@Injectable({
  providedIn: 'root',
})
export class PostHttpClientDb {
  public data = signal<PostDto[]>([]);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  postService = inject(PostService);
  apiHttpClientService = inject(ApiHttpClientService) as ApiHttpClientService<PostDto | null>;

  async getPosts() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.get<PostDto[]>("/posts");
      console.log("In post-db, posts", response())
      this.updatePosts(response() as PostDto[]);
      return response() as PostDto[];
    } catch (err: any) {
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
      const response = await this.apiHttpClientService.get<PostDto>(`/posts/${id}`);
      return response() as PostDto
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
      const response = await this.apiHttpClientService.delete<PostDto>(`/posts/${id}`);
      const newPosts = this.postService.posts()?.filter(post => post.id !== response()?.id);
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
      const response = await this.apiHttpClientService.patch<PostDto>(`/posts/${id}`, post);
      const newPosts = this.postService.posts()?.map(post => post.id === response()?.id ? response() : post);
      this.updatePosts(newPosts as PostDto[]);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  private updatePosts(newPosts: PostDto[]) {
    this.data.set(newPosts);
    this.postService.updatePosts(newPosts);
    this.postService.setLocalStorage(newPosts);
  }

  async createPost(post: PostDto) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.post<PostDto>(`/posts`, post);
      const newPosts = [...this.postService.posts(), response()];
      this.updatePosts(newPosts as PostDto[]);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }
}

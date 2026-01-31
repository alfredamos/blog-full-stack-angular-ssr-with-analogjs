import {inject, Injectable, signal} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {PostDto} from "../models/post-dto";
import {PostService} from "./post-service";

@Injectable({
  providedIn: 'root',
})
export class PostDb {
  public data = signal<PostDto[]>([]);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  postService = inject(PostService);
  apiClientService = inject(ApiClientService) as ApiClientService<PostDto | null>;

  async getPosts() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.get<PostDto[]>("/posts");
      console.log("In post-db, posts", response.data)
      this.updatePosts(response.data);
      return response.data;
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
      const response = await this.apiClientService.get<PostDto>(`/posts/${id}`);
      return response.data
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
      const response = await this.apiClientService.delete<PostDto>(`/posts/${id}`);
      const newPosts = this.postService.posts()?.filter(post => post.id !== response.data.id);
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
      const response = await this.apiClientService.patch<PostDto>(`/posts/${id}`, post);
      const newPosts = this.postService.posts()?.map(post => post.id === response.data.id ? response.data : post);
      this.updatePosts(newPosts);
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
      const response = await this.apiClientService.post<PostDto>(`/posts`, post);
      const newPosts = [...this.postService.posts(), response.data];
      this.updatePosts(newPosts);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }
}

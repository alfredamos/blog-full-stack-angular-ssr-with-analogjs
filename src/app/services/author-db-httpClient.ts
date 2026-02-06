import {inject, Injectable, signal} from '@angular/core';
import {Author} from "../models/Author";
import {AuthorService} from "./author-service";
import {ApiHttpClientService} from './api-http-client-service';
import {AuthorWithPosts} from "../models/list-author";

@Injectable({
  providedIn: 'root',
})
export class AuthorHttpClientDb {
  public data = signal<Author[]>([]);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  authorService = inject(AuthorService);

  apiHttpClientService = inject(ApiHttpClientService) as ApiHttpClientService<Author | null>;

  async getAuthors() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.get<AuthorWithPosts[]>("/authors");
      this.updateAuthors(response);
      return response
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);

    }
  }


  async getAuthorById(id: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      return await this.apiHttpClientService.get<Author>(`/authors/${id}`)
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  async getAuthorWithUserById(id: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      return await this.apiHttpClientService.get<Author>(`/authors/author-with-user/${id}`)
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  async getAuthorByEmail(email: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      return await this.apiHttpClientService.get<Author>(`/authors/get-author-by-email/${email}`)
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  async getAuthorByUserId(userId: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      return await this.apiHttpClientService.get<Author>(`/authors/get-author-by-user-id/${userId}`)
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  async getPostsWithAuthorByEmail(email: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const authorWithPosts = await this.apiHttpClientService.get<AuthorWithPosts>(`/authors/get-author-posts-by-email/${email}`)
      console.log("In get-authors, author-http-client, authorWithPosts : ", authorWithPosts);
      return authorWithPosts
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }
  async getPostsWithAuthorByUserId(userId: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const authorWithPosts = await this.apiHttpClientService.get<AuthorWithPosts>(`/authors/get-author-posts-by-user-id/${userId}`)
      console.log("In get-authors, author-http-client, authorWithPosts : ", authorWithPosts);
      return authorWithPosts
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }


  async deleteAuthorById(id: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.delete<Author>(`/authors/${id}`);
      const newAuthors = this.authorService.authors()?.filter(author => author.id !== response.id);
      this.updateAuthors(newAuthors);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }


  private updateAuthors(newAuthors: AuthorWithPosts[]) {
    this.data.set(newAuthors);
    this.authorService.updateAuthors(newAuthors);
    this.authorService.setLocalStorage(newAuthors);
  }

}

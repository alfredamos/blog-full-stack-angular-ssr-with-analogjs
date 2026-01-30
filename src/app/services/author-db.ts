import {inject, Injectable, signal} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Author} from "../models/Author";
import {AuthorService} from "./author-service";

@Injectable({
  providedIn: 'root',
})
export class AuthorDb {
  public data = signal<Author[]>([]);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  authorService = inject(AuthorService);
  apiClientService = inject(ApiClientService) as ApiClientService<Author | null>;

  async getAuthors() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiClientService.get<Author[]>("/authors");
      this.updateAuthors(response.data);
      return response.data;
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
      const response = await this.apiClientService.get<Author>(`/authors/${id}`);
      return response.data
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
      const response = await this.apiClientService.delete<Author>(`/authors/${id}`);
      const newAuthors = this.authorService.authors()?.filter(author => author.id !== response.data.id);
      this.updateAuthors(newAuthors);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }


  private updateAuthors(newAuthors: Author[]) {
    this.data.set(newAuthors);
    this.authorService.updateAuthors(newAuthors);
    this.authorService.setLocalStorage(newAuthors);
  }

}

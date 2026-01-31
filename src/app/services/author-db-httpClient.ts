import {inject, Injectable, signal} from '@angular/core';
import {Author} from "../models/Author";
import {AuthorService} from "./author-service";
import { ApiHttpClientService } from './api-http-client-service';

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
      const response = await this.apiHttpClientService.get<Author[]>("/authors");
      this.updateAuthors(response() as Author []);
      return response() as Author[];
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
      const response = await this.apiHttpClientService.get<Author>(`/authors/${id}`);
      return response() as Author
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
      const newAuthors = this.authorService.authors()?.filter(author => author.id !== response()?.id);
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

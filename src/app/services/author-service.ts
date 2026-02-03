import {computed, inject, Injectable, signal} from '@angular/core';
import {BrowserStorageService} from './browser-storage-service';
import {LocalStorageKey} from '../models/LocalStorageKey';
import {Author} from "../models/Author";
import {AuthorWithPosts} from "../models/list-author";

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private authorsState = signal<AuthorWithPosts[]>([]);
  authors = computed(() => (this.authorsState.asReadonly())() || this.getLocalStorage());

  storageService = inject(BrowserStorageService);

  updateAuthors(authors: AuthorWithPosts[]) {
    this.authorsState.set(authors);
  }

  removeAuthors(){
    this.authorsState.set([]);
    this.removeStorage();
  }

  findAuthorById(id: string) {
    return (this.authorsState()?.find(author => author.id === id));
  }

  setLocalStorage(authors: Author[]) {
    this.storageService.set(LocalStorageKey.authorKey, JSON.stringify(authors));
  }

  getLocalStorage(){
    return JSON.parse(this.storageService.get(LocalStorageKey.authorKey) as string) as Author[] ?? [];
  }

  removeStorage(){
    this.storageService.remove(LocalStorageKey.authorKey);
  }
}

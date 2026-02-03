import {computed, inject, Injectable, signal} from '@angular/core';
import {BrowserStorageService} from './browser-storage-service';
import {LocalStorageKey} from '../models/LocalStorageKey';
import {PostDto} from "../models/post-dto";
import {Post} from "../models/list-post";

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsState = signal<Post[]>([]);
  posts = computed(() => (this.postsState.asReadonly())() ?? this.getLocalStorage());

  storageService = inject(BrowserStorageService);

  updatePosts(posts: Post[]) {
    this.postsState.set(posts);
  }

  removePosts(){
    this.postsState.set([]);
    this.removeStorage();
  }

  findPostById(id: string) {
    return (this.postsState()?.find(post => post.id === id));
  }

  setLocalStorage(posts: Post[]) {
    this.storageService.set(LocalStorageKey.postKey, JSON.stringify(posts));
  }

  getLocalStorage(){
    return JSON.parse(this.storageService.get(LocalStorageKey.postKey) as string) as PostDto[] ?? [];
  }

  removeStorage(){
    this.storageService.remove(LocalStorageKey.postKey);
  }
}

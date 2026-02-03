import {Component, inject, OnInit, signal} from "@angular/core";
import {AuthorsTable} from "../../components/authors-table/authors-table";
import {Author} from "../../models/Author";
import {AuthorService} from "../../services/author-service";
import { RouteMeta } from '@analogjs/router';
import {authGuard} from "../../guards/authGuard.guard"
import {adminGuard} from "../../guards/adminGuard.guard"
import { AuthorHttpClientDb } from "../../services/author-db-httpClient";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, adminGuard],
};

@Component({
  selector: "app-authors-list-page",
  standalone: true,
  imports: [
    AuthorsTable
  ],
  template: `
    <app-authors-table
      [authors]="authors()"
    />`
})
export default class AuthorsPage implements OnInit{
  authors = signal<Author[]>([]);
  authorDb = inject(AuthorHttpClientDb);
  authorService = inject(AuthorService);

  async ngOnInit() {
    const authors = await this.loadAuthors();
    this.authors.set(authors);
  }

  async loadAuthors(){
    const authorsDb = await this.authorDb.getAuthors();

    return authorsDb ?? this.authorService.authors();
  }

}

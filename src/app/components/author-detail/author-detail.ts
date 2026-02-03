import {Component, inject, OnInit, signal} from '@angular/core';
import {Author} from "../../models/Author";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {formattedDate} from "../utils/formattedDate";
import {stringToDate} from "../utils/stringToDate";
import {AuthorService} from "../../services/author-service";
import {ModalDialog} from "../utils/modal-dialog/modal-dialog";
import { AuthorHttpClientDb } from '../../services/author-db-httpClient';

@Component({
  selector: 'app-author-detail',
  imports: [
    ModalDialog,
    RouterLink
  ],
  templateUrl: './author-detail.html',
  styleUrl: './author-detail.css',
})
export class AuthorDetail implements OnInit{
  id = "";

  isModalOpen = false;
  author = signal<Author>(new Author())

  authorDb = inject(AuthorHttpClientDb);
  authorService = inject(AuthorService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    const oneAuthor = await this.loadAuthor();

    oneAuthor.dateOfBirth = formattedDate(stringToDate(oneAuthor.dateOfBirth))

    this.author.set(oneAuthor)
  }

  async loadAuthor(){
    let oneAuthor = await this.authorDb.getAuthorById(this.id);
    return this.authorService.findAuthorById(this.id) ?? oneAuthor
  }

  openModal() {
    this.isModalOpen = true;
  }

  onModalClose() {
    this.isModalOpen = false;
  }

  async deleteAuthor(){
    await this.authorDb.deleteAuthorById(this.id as string)
    await this.router.navigate(['/authorss']);
  }
}

import {Component, input} from '@angular/core';
import {Author} from "../../models/Author";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {formattedDate} from "../utils/formattedDate";
import {stringToDate} from "../utils/stringToDate";

@Component({
  selector: 'app-authors-table',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './authors-table.html',
  styleUrl: './authors-table.css',
})
export class AuthorsTable {
  authors = input.required<Author[]>();
  public readonly formattedDate = formattedDate;
  public readonly stringToDate = stringToDate;

}

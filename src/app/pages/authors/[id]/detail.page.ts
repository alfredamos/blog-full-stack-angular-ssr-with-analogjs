import {Component} from "@angular/core";
import {AuthorDetail} from "../../../components/author-detail/author-detail";
import { RouteMeta } from '@analogjs/router';
import { authGuard } from "../../../guards/authGuard.guard";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};


@Component({
  selector: "app-detail-author-page",
  standalone: true,
  imports: [
    AuthorDetail
  ],
  template: `
    <app-author-detail/>`
})
export default class DetailAuthorPage {}

import {Component} from "@angular/core";
import { RouteMeta } from '@analogjs/router';
import { authGuard } from "../../../guards/authGuard.guard";
import {PostDetail} from "../../../components/posts/post-detail/post-detail";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard]
};

@Component({
  selector: "app-detail-post-page",
  standalone: true,
  imports: [
    PostDetail
  ],
  template: `
    <app-post-detail/>`
})
export default class DetailPage {}

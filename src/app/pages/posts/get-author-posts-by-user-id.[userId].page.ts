import {Component, OnInit} from "@angular/core";
import {PostsByAuthor} from "../../components/posts/posts-by-author/posts-by-author";
import {RouteMeta} from "@analogjs/router";
import {authGuard} from "../../guards/authGuard.guard";
import {isOwnerCheckByUserIdOrAdminGuard} from "../../guards/isOwnerCheckByUserIdOrAdminGuard.guard";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, isOwnerCheckByUserIdOrAdminGuard],
};

@Component({
  selector: "app-delete-post-by-user-id-page",
  standalone: true,
  imports: [
    PostsByAuthor
  ],
  template: `
    <app-posts-by-author/>`
})
export default class GetPostsByUserIdPage{}

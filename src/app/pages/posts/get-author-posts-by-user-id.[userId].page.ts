import {Component, OnInit} from "@angular/core";
import {PostsByAuthor} from "../../components/posts/posts-by-author/posts-by-author";
import {RouteMeta} from "@analogjs/router";
import {authGuard} from "../../guards/authGuard.guard";
import {isOwnerCheckOrAdminGuard} from "../../guards/isOwnerCheckOrAdminGuard.guard";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, isOwnerCheckOrAdminGuard],
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
export default class GetPostsByUserIdPage implements OnInit{
  ngOnInit(): void {
    console.log("This is plain one, In get-posts-by-user-id-page")
  }
}

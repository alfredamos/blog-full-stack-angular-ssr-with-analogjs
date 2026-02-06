import {Component, OnInit, inject} from "@angular/core";
import {PostsByAuthor} from "../../components/posts/posts-by-author/posts-by-author";
import {RouteMeta} from "@analogjs/router";
import {ActivatedRoute} from "@angular/router";
import {authGuard} from "../../guards/authGuard.guard";
import {PostsByEmail} from "../../components/posts/posts-by-email/posts-by-email";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: "app-detail-posts-by-email-page",
  standalone: true,
  imports: [
    PostsByEmail
  ],
  template: `
    <app-posts-by-email [email]="email"/>
  `
})
export default class GetPostsByEmailPage implements OnInit{
  email = "";

  route = inject(ActivatedRoute);


  ngOnInit(): void {
    this.email = this.route.snapshot.params['email'];
  }
}

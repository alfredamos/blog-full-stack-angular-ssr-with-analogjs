import {Component} from "@angular/core";
import { RouteMeta } from '@analogjs/router';
import {authGuard} from "../../guards/authGuard.guard"

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: "app-edit-post-page",
  standalone: true,
  template: `<p>Edit Post</p>`
})
export default class EditPostPage {}

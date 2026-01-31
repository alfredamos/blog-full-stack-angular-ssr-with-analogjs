import {Component} from "@angular/core";
import { RouteMeta } from '@analogjs/router';
import {authGuard} from "../../guards/authGuard.guard"

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: "app-detail-post-page",
  standalone: true,
  template: `<p>Detail Page</p>`
})
export default class DetailPage {}

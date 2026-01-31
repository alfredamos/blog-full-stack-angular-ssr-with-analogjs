import { Component } from '@angular/core';
import {AllPosts} from "../components/posts/all-posts/all-posts";

@Component({
  selector: 'app-home',
  imports: [
    AllPosts
  ],
  template: `
    <app-all-posts/>
  `,
})
export default class Home {}

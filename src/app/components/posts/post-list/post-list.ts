import {Component, inject, input} from '@angular/core';
import {Post} from "../../../models/list-post"
import {RouterLink} from "@angular/router";
import {BlogContent} from "../blog-content/blog-content";
import {AsyncPipe, DatePipe} from "@angular/common";
import {AdminOrOwnerCheckService} from "../../../services/adminOrOwnerCheck.service"
import {AuthService} from "../../../services/auth-service";

@Component({
  selector: 'app-post-list',
  imports: [
    RouterLink,
    BlogContent,
    DatePipe,
  ],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
  standalone: true
})
export class PostList {
  authorsWithPosts = input.required<Post[]>();





}

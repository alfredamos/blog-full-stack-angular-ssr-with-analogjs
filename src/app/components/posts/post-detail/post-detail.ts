import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PostHttpClientDb} from "../../../services/post-db-httpClient";
import {AdminOrOwnerCheckService} from "../../../services/adminOrOwnerCheck.service"
import {PostDetail as Post} from "../../../models/post-detail";
import {ModalDialog} from "../../utils/modal-dialog/modal-dialog";

@Component({
  selector: 'app-post-detail',
  imports: [
    RouterLink,
    ModalDialog,
  ],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
  standalone: true
})
export class PostDetail implements OnInit{
  id = "";
  idOfAuthor = signal<string>("");
  isModalOpen = false;
  post = signal<Post>(new Post());
  postDb = inject(PostHttpClientDb);

  isOrOwner = inject(AdminOrOwnerCheckService);

  router = inject(Router);
  route = inject(ActivatedRoute);

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];

    const post = await this.loadPost();

    this.post.set(post);

  }

  async loadPost(){
    return await this.postDb.getPostById(this.id);
  }

  openModal() {
    this.isModalOpen = true;
  }

  onModalClose() {
    this.isModalOpen = false;
  }


  async deletePost(){
    await this.postDb.deletePostById(this.id as string)
    await this.router.navigate(['/posts']);
  }
}

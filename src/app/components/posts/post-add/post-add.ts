import {Component, output, signal} from '@angular/core';
import {form, FormField, required} from "@angular/forms/signals";
import {CreatePost} from "../../../models/create-post";

@Component({
  selector: 'app-post-add',
  imports: [
    FormField
  ],
  templateUrl: './post-add.html',
  styleUrl: './post-add.css',
})
export class PostAdd {
  post = signal<CreatePost>({
    title: "",
    imageUrl: "",
    content: ""
  });

  onBackToPosts = output<void>();
  onPostCreated = output<CreatePost>();

  postForm = form(this.post, (schemaPath) => {
    required(schemaPath.title, {message: 'Title is required'});
    required(schemaPath.imageUrl, {message: "Image Url is required"});
    required(schemaPath.content, {message: "Content is required"});
  })

  onSubmit=($event: Event)=> {
    $event.preventDefault()

    this.onPostCreated.emit(this.post());
  }

  backToPosts() {
    this.onBackToPosts.emit()
  }

}

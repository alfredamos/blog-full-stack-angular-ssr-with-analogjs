import {Component, input, linkedSignal, OnChanges, OnInit, output, signal, SimpleChanges} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-blog-content',
  imports: [
    FormsModule
  ],
  templateUrl: './blog-content.html',
  styleUrl: './blog-content.css',
})
export class BlogContent implements OnInit, OnChanges{
  content = input.required<string>();
  editedContent = "";
  isEditMode = input.required<boolean>();
  showFullContent = signal(false)
  truncatedLength = 100;
  displayedContent = linkedSignal(() => this.showFullContent() ? this.content() : this.content().substring(0, this.truncatedLength) + '...');

  onChangeContent = output<string>();
  onBackToPosts = output<void>();

  changeContent($event: Event) {
    $event.preventDefault();
    this.onChangeContent.emit(this.editedContent);
  }

  ngOnInit(): void {
    this.editedContent = this.content();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.editedContent = this.content();
  }

  toggleContent = ($event: PointerEvent) => {
    $event.stopPropagation()
    this.showFullContent.set(!this.showFullContent());
  };

  backToPosts() {
    this.onBackToPosts.emit();
  }
}

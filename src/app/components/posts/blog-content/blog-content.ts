import {Component, input, linkedSignal, signal} from '@angular/core';

@Component({
  selector: 'app-blog-content',
  imports: [],
  templateUrl: './blog-content.html',
  styleUrl: './blog-content.css',
})
export class BlogContent{
  content = input.required<string>();
  showFullContent = signal(false)
  truncatedLength = 100;
  displayedContent = linkedSignal(() => this.showFullContent() ? this.content() : this.content().substring(0, this.truncatedLength) + '...');

  toggleContent = ($event: PointerEvent) => {
    $event.stopImmediatePropagation()
    this.showFullContent.set(!this.showFullContent());
  };
}

import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  imports: [],
  templateUrl: './modal-dialog.html',
  styleUrl: './modal-dialog.css',
})
export class ModalDialog {
  isOpen = input<boolean>(false);
  close = output<void>()

  closeModal() {
    this.close.emit();
  }
}

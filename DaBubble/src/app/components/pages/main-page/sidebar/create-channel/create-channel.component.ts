import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';


@Component({
  selector: 'app-create-channel',
  imports: [ButtonComponent],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss',
})
export class CreateChannelComponent {
  @Output() showModal = new EventEmitter<boolean>();

  closeModal() {
    this.showModal.emit(false);
  }
}

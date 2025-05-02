import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-channel-edit-popup',
  imports: [DropdownComponent, ButtonComponent, FormsModule, CommonModule],
  templateUrl: './channel-edit-popup.component.html',
  styleUrl: './channel-edit-popup.component.scss',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ChannelEditPopupComponent {
  edit: boolean = false;

  @Input() visible: boolean = false; // 👈 DAS ist wichtig
  @Output() closed = new EventEmitter<void>();

  onCloseClick() {
    this.closed.emit();
  }

  editChannelName() {
    this.edit = !this.edit;
  }

  saveChannelName() {
    this.edit = !this.edit;
  }
}

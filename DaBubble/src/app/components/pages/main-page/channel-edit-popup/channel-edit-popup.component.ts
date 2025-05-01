import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-channel-edit-popup',
  imports: [DropdownComponent, ButtonComponent, FormsModule, CommonModule],
  templateUrl: './channel-edit-popup.component.html',
  styleUrl: './channel-edit-popup.component.scss',
})
export class ChannelEditPopupComponent {
  @Input() visible: boolean = false; // 👈 DAS ist wichtig
  @Output() closed = new EventEmitter<void>();

  onCloseClick() {
    this.closed.emit();
  }
}

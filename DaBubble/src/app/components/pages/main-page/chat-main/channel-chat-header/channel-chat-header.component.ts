import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { ChannelEditPopupComponent } from '../channel-edit-popup/channel-edit-popup.component';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-channel-chat-header',
  imports: [ButtonComponent, ChannelEditPopupComponent, DropdownComponent, FormsModule, CommonModule],
  templateUrl: './channel-chat-header.component.html',
  styleUrl: './channel-chat-header.component.scss',
})
export class ChannelChatHeaderComponent {
  showPopup = false;

openPopup() {
  this.showPopup = true;
}

closePopup() {
  this.showPopup = false;
}
}

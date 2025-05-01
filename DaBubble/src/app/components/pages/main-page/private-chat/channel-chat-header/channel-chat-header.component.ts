import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { ChannelEditPopupComponent } from '../../channel-edit-popup/channel-edit-popup.component';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';

@Component({
  selector: 'app-channel-chat-header',
  imports: [ButtonComponent, ChannelEditPopupComponent, DropdownComponent],
  templateUrl: './channel-chat-header.component.html',
  styleUrl: './channel-chat-header.component.scss',
})
export class ChannelChatHeaderComponent {}

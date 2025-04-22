import { Component } from '@angular/core';
import { ChatInputComponent } from '../shared/chat-input/chat-input.component';
import { ChatMessagesContainerComponent } from '../shared/chat-messages-container/chat-messages-container.component';
import { PrivateChatHeaderComponent } from '../shared/private-chat-header/private-chat-header.component';
import { ChatType } from '../../types/types';


@Component({
  selector: 'app-private-chat',
  imports: [
    ChatInputComponent,
    ChatMessagesContainerComponent,
    PrivateChatHeaderComponent
  ],
  templateUrl: './private-chat.component.html',
  styleUrl: './private-chat.component.scss'
})
export class PrivateChatComponent {
  chatType = ChatType;
}

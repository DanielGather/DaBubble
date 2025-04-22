import { Component } from '@angular/core';
import { ChatInputComponent } from '../shared/chat-input/chat-input.component';
import { ChatMessagesContainerComponent } from '../shared/chat-messages-container/chat-messages-container.component';

@Component({
  selector: 'app-private-chat',
  imports: [
    ChatInputComponent,
    ChatMessagesContainerComponent
  ],
  templateUrl: './private-chat.component.html',
  styleUrl: './private-chat.component.scss'
})
export class PrivateChatComponent {

}

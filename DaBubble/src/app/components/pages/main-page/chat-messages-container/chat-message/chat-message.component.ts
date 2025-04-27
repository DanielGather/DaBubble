import { Component, Input } from '@angular/core';
import { MessageType, ChatMessage, ChatType } from '../../../../../types/types';

@Component({
  selector: 'app-chat-message',
  imports: [],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
  @Input() chatType:ChatType = ChatType.default;
  @Input() messageTypeInput:MessageType = MessageType.default;
  @Input() message:ChatMessage = {
    message: '',
    name: '',
    timestamp: '',
    userId: ''
  }
}

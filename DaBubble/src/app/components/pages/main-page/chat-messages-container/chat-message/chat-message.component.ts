import { Component, Input } from '@angular/core';
import { MessageType, ChatMessage } from '../../../../../types/types';

@Component({
  selector: 'app-chat-message',
  imports: [],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
  messageType = MessageType;
  @Input() messageTypeInput:MessageType = this.messageType.default;
  @Input() message:ChatMessage = {
    message: '',
    name: '',
    timestamp: '',
    userId: ''
  }
}

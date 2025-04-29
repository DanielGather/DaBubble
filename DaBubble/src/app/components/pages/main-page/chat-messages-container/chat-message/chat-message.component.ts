import { Component, Input } from '@angular/core';
import { MessageType, ChatMessage, ChatType} from '../../../../../types/types';
import { SingleEmojiComponent } from './single-emoji/single-emoji.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-message',
  imports: [
    SingleEmojiComponent,
    CommonModule
  ],
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
    userId: '',
    emojis: [
      {
        emojiId: '',
        userIdCount: []
      }
    ]
  }
  showMenu:boolean = false;
  showEmojiMenu:boolean = false;
  
}

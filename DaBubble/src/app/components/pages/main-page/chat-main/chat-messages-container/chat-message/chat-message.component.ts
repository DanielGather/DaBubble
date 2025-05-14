import { Component, Input } from '@angular/core';
import {
  MessageType,
  ChatMessage,
  ChatType,
} from '../../../../../../types/types';
import { SingleEmojiComponent } from './single-emoji/single-emoji.component';
import { CommonModule } from '@angular/common';
import { PopOverComponent } from '../../../shared/pop-over/pop-over.component';

@Component({
  selector: 'app-chat-message',
  imports: [SingleEmojiComponent, CommonModule, PopOverComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent {
  @Input() chatType: ChatType = ChatType.default;
  @Input() messageTypeInput: MessageType = MessageType.default;
  @Input() message: ChatMessage = {
    message: '',
    name: '',
    timestamp: '',
    creatorId: '',
    userId: '',
    emojis: [
      {
        emojiId: '',
        userIdCount: [],
      },
    ],
    thread: [],
  };
  @Input() isThread: boolean = false;
  @Input() isTopMessage: boolean = false;
  @Input() answersCount: number | null = null;
  showMenu: boolean = false;
  showEmojiMenu: boolean = false;
}

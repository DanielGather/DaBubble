import { Component, Input, inject, OnInit, OnDestroy } from '@angular/core';
import {
  MessageType,
  ChatMessage,
  ChatType,
} from '../../../../../../types/types';
import { SingleEmojiComponent } from './single-emoji/single-emoji.component';
import { CommonModule } from '@angular/common';
import { PopOverComponent } from '../../../shared/pop-over/pop-over.component';
import { UsersService } from '../../../../../../services/users.service';
import { Subject, takeUntil } from 'rxjs';

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
    creatorName: '',
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

  constructor() {}


}

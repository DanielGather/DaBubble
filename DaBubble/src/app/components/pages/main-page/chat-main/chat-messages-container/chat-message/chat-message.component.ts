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
export class ChatMessageComponent implements OnInit, OnDestroy {
  //services
  userService = inject(UsersService);

  //for html
  user: any;

  //unsubscribe variables
  private destroy$ = new Subject<void>();

  @Input() chatType: ChatType = ChatType.default;
  @Input() messageTypeInput: MessageType = MessageType.default;
  @Input() message: ChatMessage = {
    message: '',
    name: '',
    timestamp: '',
    creatorId: '',
    creatorName: '',
    creatorAvatarId: 0,
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

  constructor() { }

  ngOnInit(): void {
    this.userService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

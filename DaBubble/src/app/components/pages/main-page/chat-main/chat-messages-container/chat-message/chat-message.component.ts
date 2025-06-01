import {
  Component,
  Input,
  inject,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import {
  MessageType,
  ChatMessage,
  ChatType,
  EmojiFnRegulator,
} from '../../../../../../types/types';
import { SingleEmojiComponent } from './single-emoji/single-emoji.component';
import { CommonModule } from '@angular/common';
import { PopOverComponent } from '../../../shared/pop-over/pop-over.component';
import { UsersService } from '../../../../../../services/users.service';
import { Subject, takeUntil } from 'rxjs';
import { ThreadService } from '../../../../../../services/thread.service';
import { FirestoreService } from '../../../../../../services/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelsService } from '../../../../../../services/channels.service';
import { EmojiService } from '../../../../../../services/emoji.service';

@Component({
  selector: 'app-chat-message',
  imports: [SingleEmojiComponent, CommonModule, PopOverComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent implements OnInit, OnDestroy {
  //services
  userService = inject(UsersService);
  threadbarService = inject(ThreadService);
  firestoreService = inject(FirestoreService);
  channelsService = inject(ChannelsService);
  emojiService = inject(EmojiService);

  //types
  emojiFnRegulator = EmojiFnRegulator;

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
    threadId: '',
    emojis: [
      {
        emojiId: '',
        userIdCount: [],
      },
    ],
  };
  @Input() isThread: boolean = false;
  @Input() isTopMessage: boolean = false;
  @Input() answersCount: number | null = null;

  /**
   * message-interactions menu state boolean
   */
  showMenu: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async openThreadBar(message: any) {
    let channelId = this.route.snapshot.paramMap.get('id');
    let threadId: string;
    console.log(message.messageId);

    if (message.threadId) {
      threadId = message.threadId;
      console.log('Öffne bestehenden Thread:', threadId);
    } else {
      // Neuen Thread erstellen
      let channels = this.channelsService.channels();
      let rightChannel = channels.find((channel) => channel.id === channelId);

      threadId = await this.firestoreService.addDoc('threads', {
        channelId: channelId,
        userIds: rightChannel?.data.userIds,
        originalMessageId: message.messageId, // Referenz zur ursprünglichen Nachricht
        createdAt: new Date(),
      });

      // Thread-ID in der ursprünglichen Nachricht speichern
      await this.firestoreService.updateDoc('messages', message.messageId, {
        threadId: threadId,
      });

      console.log('Neuer Thread erstellt:', threadId);
    }

    // Navigation und UI-State
    this.threadbarService.openThread(threadId, channelId!);
    this.router.navigate(['/chat', 'channel', channelId, 'thread', threadId]);
  }
}

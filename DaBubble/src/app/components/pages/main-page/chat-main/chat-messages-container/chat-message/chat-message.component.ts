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
  showMenu: boolean = false;
  showEmojiMenu: boolean = false;

    /**
   * closes the emoji menu, if user is clicking outside of .menu-container & .emoji-button
   * 
   * @param event just an event, it triggers if the user is clicking outside of .menu-container & .emoji-button
   */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-container') && !target.closest('.emoji-button')) {
      this.showEmojiMenu = false;
    }
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    //test
    console.log('TEST', this.chatType);
    //testends
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
        originalMessageId: '0eKdA6SEm7A5zMCSVKfa', // Referenz zur ursprünglichen Nachricht
        createdAt: new Date(),
      });

      // Thread-ID in der ursprünglichen Nachricht speichern
      await this.firestoreService.updateDoc(
        'messages',
        '0eKdA6SEm7A5zMCSVKfa',
        {
          threadId: threadId,
        }
      );

      console.log('Neuer Thread erstellt:', threadId);
    }

    // Navigation und UI-State
    this.threadbarService.openThread(threadId, channelId!);
    this.router.navigate(['/chat', 'channel', channelId, 'thread', threadId]);
  }

}

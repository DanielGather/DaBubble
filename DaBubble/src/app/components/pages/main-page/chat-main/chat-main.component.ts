import {
  Component,
  OnInit,
  Input,
  inject,
  effect,
  signal,
  computed,
  WritableSignal
} from '@angular/core';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChatType, Message, ChatInputType } from '../../../../types/types';
import { CommonModule } from '@angular/common';
import { ChatMessagesContainerComponent } from './chat-messages-container/chat-messages-container.component';
import { PrivateChatHeaderComponent } from './private-chat-header/private-chat-header.component';
import { ChannelChatHeaderComponent } from './channel-chat-header/channel-chat-header.component';
import { ActivatedRoute } from '@angular/router';
import { MessagesDataService } from '../../../../services/messages-data.service';
import { UsersService } from '../../../../services/users.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { DefaultComponent } from './default/default.component';
import { FirestoreService } from '../../../../services/firestore.service';
import { GetUrlChatidService } from '../../../../services/get-url-chatid.service';
import { ThreadsbarComponent } from '../chat-thread/threadsbar/threadsbar.component';
import { ThreadService } from '../../../../services/thread.service';

@Component({
  selector: 'app-chat-main',
  imports: [
    CommonModule,
    ChatInputComponent,
    ChatMessagesContainerComponent,
    PrivateChatHeaderComponent,
    ChannelChatHeaderComponent,
    DefaultComponent,
    ThreadsbarComponent,
  ],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.html',
})
export class ChatMainComponent implements OnInit {
  //type
  chatInputType = ChatInputType;

  //services
  messageDataService = inject(MessagesDataService);
  urlService = inject(GetUrlChatidService);
  threadbarService = inject(ThreadService);

  //thread boolean states
  readonly isActive = this.threadbarService.threadState;
  readonly isThreadbarOpen = computed(() => this.isActive().isOpen);

  /**
   * service variables
   */
  usersService = inject(UsersService);
  authService = inject(AuthenticationService);
  firestoreService = inject(FirestoreService);
  messageService = inject(MessagesDataService);

  unsubscribeMessages: any;

  /**
   * variable to use the enum ChatType in the html-template.
   */
  chatType = ChatType;

  /**
   * defines wich chat-layout should be used.
   */
  @Input() chatTypeInput: ChatType | string = ChatType.default;

  /**
   * the array of chatmessages wich should be rendered
   */
  chatMessages: Array<any> = [];

  //other
  cachedChatId: WritableSignal<string> = signal('');

  //signals
  newMessages = signal<Message[]>([]);
  urlParamsSignal = toSignal(this.urlService.urlParameter$);
  chatTypeSignal = computed(() => this.urlParamsSignal()?.chatType);

  constructor(private route: ActivatedRoute) {
    effect(() => {
      const allMessages = this.messageService.messages();
      const channelId = this.urlParamsSignal()?.chatId;
      const chatType = this.chatTypeSignal();

      this.chatTypeInput = chatType!;
      if (this.chatTypeInput == null) {
        this.chatTypeInput = ChatType.default;
      }

      //if channel
      if (this.chatTypeInput === ChatType.channel) {
        const filtered = allMessages.filter(
          (msg) => msg.channelId === channelId
        );
        const sorted = this.sortMsgs(filtered);

        this.newMessages.set(sorted);
      }

      //if private
      else if (this.chatTypeInput === ChatType.private) {
        const filtered = allMessages.filter(
          (msg) => msg.privateChatId !== '' && msg.userIds.includes(channelId!)
        );
        const sorted = this.sortMsgs(filtered);

        this.newMessages.set(sorted);
      }
      console.log('NEW MESSAGES', this.newMessages());

      this.chatMessages = this.newMessages();
    });

    // effect(() => {
    //   //if params change, close thread // hier ist die funktion die irgendwie immer triggert
    //   const currentChatId = this.urlService.currentParams.chatId!;
    //   const cachedId = this.cachedChatId();

    //   if (currentChatId !== cachedId) {
    //     this.threadbarService.closeThread();
    //     this.cachedChatId.set(currentChatId);
    //   }
    // })
  }

  ngOnInit(): void {
    this.cachedChatId.set(this.urlService.currentParams.threadsId!);
  }

  sortMsgs(filtered: Message[]) {
    return filtered.sort((a, b) => {
      return parseInt(a.timestamp) - parseInt(b.timestamp);
    });
  }
}

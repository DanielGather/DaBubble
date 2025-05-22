import {
  Component,
  OnInit,
  Input,
  inject,
  effect,
  signal,
  computed
} from '@angular/core';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChatType, Message } from '../../../../types/types';
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

@Component({
  selector: 'app-chat-main',
  imports: [
    CommonModule,
    ChatInputComponent,
    ChatMessagesContainerComponent,
    PrivateChatHeaderComponent,
    ChannelChatHeaderComponent,
    DefaultComponent,
  ],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.html',
})
export class ChatMainComponent implements OnInit {

  //services
  messageDataService = inject(MessagesDataService);
  urlService = inject(GetUrlChatidService);


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

  //signals
  newMessages = signal<Message[]>([]);
  currentChannelId = '';
  urlParamsSignal = toSignal(this.urlService.urlParameter$);
  chatTypeSignal = computed(() => this.urlParamsSignal()?.chatType);

  chatTypeInputRoute!: string;
  constructor(private router: ActivatedRoute) {
    effect(() => {
      const allMessages = this.messageService.messages();
      const channelId = this.urlParamsSignal()?.chatId
      const chatType = this.chatTypeSignal();
      
      this.chatTypeInput = chatType!;
      if(this.chatTypeInput == null) {
        this.chatTypeInput = ChatType.default;
      }

      this.currentChannelId = this.urlParamsSignal()?.chatId!;
      console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiierr chatpartnerid', this.currentChannelId);
            

      //if channel
      if (this.chatTypeInput === ChatType.channel) {
        const filtered = allMessages.filter((msg) => msg.channelId === channelId);
        const sorted = this.filterMsgs(filtered);

        this.newMessages.set(filtered);
      }

      //if private
      else if (this.chatTypeInput === ChatType.private) {
        const filtered = allMessages.filter((msg) => msg.privatChatId !== '' && msg.userIds.includes(channelId!));
        const sorted = this.filterMsgs(filtered);

        this.newMessages.set(filtered);
      }

      console.log('effect signal newMessage', this.newMessages());
      this.chatMessages = this.newMessages();
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    console.log('USER ID IST DA', this.authService.currentUserId);
  }

  /**
   * this function is used to set the type of the chat-main component equal the type of the URL-parameter.
   * 
   * (noch umbauen auf geturlparams-service )
   */
  getChatTypeFromURL() {
    this.chatTypeInput = 
      this.router.snapshot.paramMap.get('chatType') || ChatType.default;
  }

  filterMsgs(filtered: Message[]) {
    filtered.sort((a, b) => {
      return parseInt(a.timestamp) - parseInt(b.timestamp);
    })
  }
}

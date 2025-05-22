import {
  Component,
  OnInit,
  Input,
  inject,
  effect,
  signal,
} from '@angular/core';
import { ChatInputComponent } from './chat-input/chat-input.component';
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
  //test
  messageDataService = inject(MessagesDataService);
  //testend

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

  // newMessage: Message[] = [];

  newMessages = signal<Message[]>([]);
  currentChannelId = signal<string>('');


  chatTypeInputRoute!: string;
  constructor(private router: ActivatedRoute) {
    effect(() => {
      const allMessages = this.messageService.messages();
      const channelId = this.currentChannelId();
      const filtered = allMessages.filter((msg) => msg.channelId === channelId);
      const sorted =  filtered.sort((a, b) => {
                        return parseInt(a.timestamp) - parseInt(b.timestamp);
                      })

      this.newMessages.set(filtered);
      this.chatMessages = this.newMessages();
      console.log('effect signal newMessage', this.newMessages());
    });
  }

  ngOnInit(): void {
    // Sofortige Initialisierung beim ersten Laden
    const initialChannelId = this.router.snapshot.paramMap.get('id')!;
    this.loadMessages(initialChannelId);

    // Reagieren auf spätere Router-Änderungen (z. B. Tab-Wechsel)
    this.router.paramMap.subscribe((params) => {
      const newChannelId = params.get('id');
      if (newChannelId && newChannelId !== this.currentChannelId()) {
        this.loadMessages(newChannelId);
      }
    });

    this.getChatTypeFromURL();
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

  loadMessages(channelId: string) {
    this.currentChannelId.set(channelId);
  }
}

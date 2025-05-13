import {
  Component,
  OnInit,
  Input,
  inject,
  effect,
  signal,
} from '@angular/core';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatType, ChatMessage, Message } from '../../../../types/types';
import { CommonModule } from '@angular/common';
import { ChatMessagesContainerComponent } from './chat-messages-container/chat-messages-container.component';
import { PrivateChatHeaderComponent } from './private-chat-header/private-chat-header.component';
import { ChannelChatHeaderComponent } from './channel-chat-header/channel-chat-header.component';
import { ActivatedRoute } from '@angular/router';
import { MessagesDataService } from '../../../../services/messages-data.service';
import { UsersService } from '../../../../services/users.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ThreadsbarComponent } from '../chat-thread/threadsbar/threadsbar.component';
import { DefaultComponent } from './default/default.component';
import { FirestoreService } from '../../../../services/firestore.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-chat-main',
  imports: [
    CommonModule,
    ChatInputComponent,
    ChatMessagesContainerComponent,
    PrivateChatHeaderComponent,
    ChannelChatHeaderComponent,
    ThreadsbarComponent,
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
  chatMessages: Array<ChatMessage> = [];

  // newMessage: Message[] = [];

  newMessage = signal<Message[]>([]);
  currentChannelId = signal<string>('');

  chatTypeInputRoute!: string;
  constructor(private router: ActivatedRoute) {
    effect(() => {
      const allMessages = this.usersService.messages();
      const channelId = this.currentChannelId();
      const filtered = allMessages.filter((msg) => msg.channelId === channelId);
      this.newMessage.set(filtered);
    });
  }

  // ngOnInit(): void {
  //   let userId = localStorage.getItem('id')!;
  //   //test
  //   // this.unsubscribeMessages = this.usersService.subscribeToMessages(userId);
  //   this.usersService.subscribeToMessages(userId);
  //   this.chatTypeInput = this.router.snapshot.paramMap.get('id')!;
  //   console.log('Router', this.chatTypeInput);
  //   this.router.paramMap.subscribe((params) => {
  //     this.chatTypeInput = params.get('id')!;
  //     console.log('ROUTER2', this.chatTypeInput);
  //   });
  //   this.loadMessages(this.chatTypeInput);

  //   this.chatMessages = this.messageDataService.testMessages; //this one must be the data of the observable later on
  //   //testend
  //   this.getChatTypeFromURL();
  // }

  ngOnInit(): void {
    const userId = localStorage.getItem('id')!;
    this.usersService.subscribeToMessages(userId);

    setTimeout(() => {
      console.log('ANDRE LOG MSGS: ', this.usersService.subscribeToMessages(userId));
      
    }, 2000);
    

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
    this.chatMessages = this.messageDataService.testMessages;
  }

  ngAfterViewInit() {
    console.log('USER ID IST DA', this.authService.currentUserId);
  }

  /**
   * this function is used to set the type of the chat-main component equal the type of the URL-parameter.
   */
  getChatTypeFromURL() {
    this.chatTypeInput =
      this.router.snapshot.paramMap.get('chatType') || ChatType.default;
    console.log('chattype is: ', this.chatTypeInput);
  }

  loadMessages(channelId: string) {
    this.currentChannelId.set(channelId);
  }

  // loadMessages(channelId: string) {
  //   this.usersService.messages$
  //     .pipe(
  //       map((allMessages) =>
  //         allMessages.filter((msg) => msg.channelId === channelId)
  //       )
  //     )
  //     .subscribe((filtered) => {
  //       this.newMessage = filtered;
  //     });
  // }
}

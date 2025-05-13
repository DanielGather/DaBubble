import { Component, OnInit, Input, inject, effect } from '@angular/core';
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

  newMessage: Message[] = [];

  chatTypeInputRoute!: string;
  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    //test
    this.chatTypeInput = this.router.snapshot.paramMap.get('id')!;
    console.log('Router', this.chatTypeInput);
    this.router.paramMap.subscribe((params) => {
      this.chatTypeInput = params.get('id')!;
      console.log('ROUTER2', this.chatTypeInput);
      this.loadMessages(this.chatTypeInput);
    });

    this.chatMessages = this.messageDataService.testMessages; //this one must be the data of the observable later on
    //testend
    this.getChatTypeFromURL();
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
    const channelMessages = this.usersService.userDataObject.messages.filter(
      (msg) => msg.channelId === channelId
    );
    // 2. Neues Objekt zusammenbauen (z.B. nur mit den gefilterten Messages)
    const filteredData = {
      messages: channelMessages,
    };
    this.newMessage = filteredData.messages;
    console.log('filteredData', filteredData.messages[0].message);
  }
}

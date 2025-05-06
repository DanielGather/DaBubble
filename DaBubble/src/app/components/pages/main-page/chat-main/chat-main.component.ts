import { Component, OnInit, Input, inject } from '@angular/core';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatType, ChatMessage } from '../../../../types/types';
import { CommonModule } from '@angular/common';
import { ChatMessagesContainerComponent } from './chat-messages-container/chat-messages-container.component';
import { PrivateChatHeaderComponent } from './private-chat-header/private-chat-header.component';
import { ChannelChatHeaderComponent } from './channel-chat-header/channel-chat-header.component';
import { ActivatedRoute } from '@angular/router';
import { ThreadsbarComponent } from './threadsbar/threadsbar.component';
import { MessagesDataService } from '../../../../services/messages-data.service';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-chat-main',
  imports: [
    CommonModule,
    ChatInputComponent,
    ChatMessagesContainerComponent,
    PrivateChatHeaderComponent,
    ChannelChatHeaderComponent,
    ThreadsbarComponent,
  ],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.html',
})
export class ChatMainComponent implements OnInit {
  //test
  messageDataService = inject(MessagesDataService);
  //testend
  
  /**
   * users service variable
   */
  usersService = inject(UsersService);
  
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

  /**
   * this variable is used to have a reference of the current active route
   */
  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    //test
    this.chatMessages = this.messageDataService.testMessages;

    //testend

    this.getChatTypeFromURL();
  }

  /**
   * this function is used to set the type of the chat-main component equal the type of the URL-parameter.
   */
  getChatTypeFromURL() {
    this.chatTypeInput =
      this.router.snapshot.paramMap.get('chatType') || ChatType.default;
    console.log('chattype is: ', this.chatTypeInput);
  }
}

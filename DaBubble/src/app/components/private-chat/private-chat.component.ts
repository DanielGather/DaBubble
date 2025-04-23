import { Component, OnInit } from '@angular/core';
import { ChatInputComponent } from '../shared/chat-input/chat-input.component';
import { ChatMessagesContainerComponent } from '../shared/chat-messages-container/chat-messages-container.component';
import { PrivateChatHeaderComponent } from '../shared/private-chat-header/private-chat-header.component';
import { ChatType, ChatMessage } from '../../types/types';


@Component({
  selector: 'app-private-chat',
  imports: [
    ChatInputComponent,
    ChatMessagesContainerComponent,
    PrivateChatHeaderComponent
  ],
  templateUrl: './private-chat.component.html',
  styleUrl: './private-chat.component.scss'
})
export class PrivateChatComponent implements OnInit{
  chatType = ChatType;
  chatMessages:Array<ChatMessage> = [];

  //test
  testMessages:Array<ChatMessage> = [
    {
      message: 'Hallo ich bin der currentUser',
      timestamp: 'Dienstag, 14 Januar',
      name: 'Max Mustermann',
      userId: '123'
    },
    {
      message: 'Hallo ich bin der otherUser',
      timestamp: 'Dienstag, 15 Januar',
      name: 'Testi Testo',
      userId: '1234'
    },
    {
      message: 'Hallo ich bin der otherUser',
      timestamp: 'Dienstag, 16 Januar',
      name: 'Testi Testo',
      userId: '1234'
    },
  ]
  //testends
  
  ngOnInit(): void {
    this.chatMessages = this.testMessages;
  }
}

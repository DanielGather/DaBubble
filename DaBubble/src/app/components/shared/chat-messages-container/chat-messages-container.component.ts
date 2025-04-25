import { Component, Input, AfterViewInit } from '@angular/core';
import { ChatMessage, ChatType, MessageType } from '../../../types/types';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';

@Component({
  selector: 'app-chat-messages-container',
  imports: [
    ChatInfoComponent,
    ChatMessageComponent
  ],
  templateUrl: './chat-messages-container.component.html',
  styleUrl: './chat-messages-container.component.scss'
})
export class ChatMessagesContainerComponent implements AfterViewInit{
  chatType = ChatType;
  messageType = MessageType;
  @Input() chatTypeInput:ChatType = ChatType.default; 
  @Input() chatMessages:Array<ChatMessage> = [];

  //test
  userId = '123';
  //testends

  ngAfterViewInit(): void {
    
  }
}

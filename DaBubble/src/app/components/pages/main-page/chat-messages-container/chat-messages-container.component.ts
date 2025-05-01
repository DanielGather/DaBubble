import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ChatMessage, ChatType, MessageType } from '../../../../types/types';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';


@Component({
  selector: 'app-chat-messages-container',
  imports: [
  ChatInfoComponent,
   ChatMessageComponent,
  ],
  templateUrl: './chat-messages-container.component.html',
  styleUrl: './chat-messages-container.component.scss'
})
export class ChatMessagesContainerComponent implements AfterViewInit {
  chatType = ChatType;
  messageType = MessageType;

  /**
   * is used to identify if the current chat is a private or a channel chat.
   */
  @Input() chatTypeInput:ChatType = ChatType.default; 

  /**
   * this is the array that contains the chat messages
   */
  @Input() chatMessages:Array<ChatMessage> = [];

  /**
   * an elementreference to the message field. (messages are rendered in here)
   */
  @ViewChild('messageField') private messageField!: ElementRef;

  //test
  userId = '123';
  //testends

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

/**
 * is used to scroll to the bottom of the message container to see the newest messages
 */
  scrollToBottom():void {
    this.messageField.nativeElement.scrollTop = this.messageField.nativeElement.scrollHeight;    
  }
}

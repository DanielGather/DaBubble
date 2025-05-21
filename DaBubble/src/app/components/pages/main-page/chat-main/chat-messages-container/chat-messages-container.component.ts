import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  inject,
  Inject,
} from '@angular/core';
import { ChatMessage, ChatType, MessageType } from '../../../../../types/types';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { MessagesDataService } from '../../../../../services/messages-data.service';
import { UsersService } from '../../../../../services/users.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-chat-messages-container',
  imports: [ChatInfoComponent, ChatMessageComponent],
  templateUrl: './chat-messages-container.component.html',
  styleUrl: './chat-messages-container.component.scss',
})
export class ChatMessagesContainerComponent implements AfterViewInit {
  messageDataService = inject(MessagesDataService);
  userService = inject(UsersService);
  chatType = ChatType;
  messageType = MessageType;

  /**
   * is used to identify if the current chat is a private or a channel chat.
   */
  @Input() chatTypeInput: ChatType = ChatType.default;

  /**
   * this is the array that contains the chat messages
   */
  @Input() chatMessages: Array<ChatMessage> = [];

  @Input() isThread: boolean = false;

  /**
   * an elementreference to the message field. (messages are rendered in here)
   */
  @ViewChild('messageField') private messageField!: ElementRef;

  //test
  userId = this.userService.currentUserId;
  //testends

  ngAfterViewInit(): void {
    this.scrollToBottom();

    //test
    this.sortMessages();
  }

  /**
   * is used to scroll to the bottom of the message container to see the newest messages
   */
  scrollToBottom(): void {
    this.messageField.nativeElement.scrollTop =
      this.messageField.nativeElement.scrollHeight;
  }

  logCreatorId(id: string) {
    console.log(id);

  }

  //test
  sortMessages() {
    const sorted = this.chatMessages.sort((a, b) => {
      return parseInt(a.timestamp) - parseInt(b.timestamp);
    });
    this.chatMessages = sorted;
  }
}

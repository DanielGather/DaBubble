import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ChatMessage,
  ChatType,
  MessageType,
  AppUser,
} from '../../../../../types/types';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { MessagesDataService } from '../../../../../services/messages-data.service';
import { UsersService } from '../../../../../services/users.service';
import { FirestoreService } from '../../../../../services/firestore.service';
import { OtherUsersPopupComponent } from '../../shared/other-users-popup/other-users-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-messages-container',
  imports: [ChatInfoComponent, ChatMessageComponent, OtherUsersPopupComponent, CommonModule],
  templateUrl: './chat-messages-container.component.html',
  styleUrl: './chat-messages-container.component.scss',
})
export class ChatMessagesContainerComponent
  implements AfterViewInit, OnChanges
{
  firestore = inject(FirestoreService);
  messageDataService = inject(MessagesDataService);
  userService = inject(UsersService);

  //types
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

  /**
   * a help variable to make things clearer.
   * contains, currentUserId.
   */
  userId = this.userService.currentUserId;
  clickedUserData: AppUser | null = null;
  showUserPopupVisible: boolean = false;

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatMessages'] && changes['chatMessages'].currentValue) {
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  /**
   * is used to scroll to the bottom of the message container to see the newest messages
   */
  scrollToBottom(): void {
    this.messageField.nativeElement.scrollTop =
      this.messageField.nativeElement.scrollHeight;
  }

  async loadUserData(id: string) {
    const user = await this.firestore.getSingleCollection<AppUser>('users', id);
    if (user) {
      this.clickedUserData = user;
      this.showUserPopupVisible = true;
    }
  }
}

import { Component } from '@angular/core';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { CommonModule } from '@angular/common';
import { ChatMessagesContainerComponent } from '../chat-messages-container/chat-messages-container.component';
import { MessagesDataService } from '../../../../../services/messages-data.service';

@Component({
  selector: 'app-threadsbar',
  imports: [ChatInputComponent, CommonModule, ChatMessagesContainerComponent],
  templateUrl: './threadsbar.component.html',
  styleUrl: './threadsbar.component.scss',
})
export class ThreadsbarComponent {
  isOpen: boolean = true;
  chatMessages: any;
  currentThreadMessageId: string = '';

  constructor(public messageDataService: MessagesDataService) {
    this.chatMessages = this.messageDataService.testMessages;
  }
}

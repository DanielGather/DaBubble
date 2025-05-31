import { Component, Input, inject, computed } from '@angular/core';
import { ChatInputComponent } from '../../chat-main/chat-input/chat-input.component';
import { CommonModule } from '@angular/common';
import { ChatMessagesContainerComponent } from '../../chat-main/chat-messages-container/chat-messages-container.component';
import { MessagesDataService } from '../../../../../services/messages-data.service';
import { ChatMessage } from '../../../../../types/types';
import { ThreadService } from '../../../../../services/thread.service';

@Component({
  selector: 'app-threadsbar',
  imports: [ChatInputComponent, CommonModule, ChatMessagesContainerComponent],
  templateUrl: './threadsbar.component.html',
  styleUrl: './threadsbar.component.scss',
})
export class ThreadsbarComponent {
  @Input() chatMessages: Array<ChatMessage> = [];

  threadMessage = computed(() => {
    return this.chatMessages.filter(
      (message) => message.threadId === this.threadbarService.currentThreadId()
    );
  });

  messageDataService = inject(MessagesDataService);
  isOpen: boolean = true;
  currentThreadMessageId: string = '';

  threadbarService = inject(ThreadService);

  constructor() {}

  ngOnInit() {
    console.log('threadmessages', this.threadMessage());
  }

  closeThread() {
    this.threadbarService.closeThread();
  }
}

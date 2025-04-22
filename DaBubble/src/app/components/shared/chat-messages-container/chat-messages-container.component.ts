import { Component, Input, AfterViewInit } from '@angular/core';
import { ChatType } from '../../../types/types';
import { ChatInfoComponent } from './chat-info/chat-info.component';

@Component({
  selector: 'app-chat-messages-container',
  imports: [ChatInfoComponent],
  templateUrl: './chat-messages-container.component.html',
  styleUrl: './chat-messages-container.component.scss'
})
export class ChatMessagesContainerComponent implements AfterViewInit{
  chatType = ChatType;
  @Input() chatTypeInput:ChatType = ChatType.default; 

  ngAfterViewInit(): void {
    
  }
}

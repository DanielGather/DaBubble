import { Component, Input, AfterViewInit } from '@angular/core';
import { ChatType } from '../../../types/types';

@Component({
  selector: 'app-chat-messages-container',
  imports: [],
  templateUrl: './chat-messages-container.component.html',
  styleUrl: './chat-messages-container.component.scss'
})
export class ChatMessagesContainerComponent implements AfterViewInit{
  chatType = ChatType;
  @Input() chatTypeInput:ChatType = ChatType.default; 

  ngAfterViewInit(): void {
    console.log(this.chatTypeInput);
    
  }
}

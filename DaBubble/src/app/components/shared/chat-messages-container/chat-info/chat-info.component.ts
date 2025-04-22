import { Component, Input, AfterViewInit } from '@angular/core';
import { ChatType } from '../../../../types/types';

@Component({
  selector: 'app-chat-info',
  imports: [],
  templateUrl: './chat-info.component.html',
  styleUrl: './chat-info.component.scss'
})
export class ChatInfoComponent implements AfterViewInit {
  @Input() chatTypeInput:ChatType = ChatType.default;

  ngAfterViewInit(): void {
  
    
  }
}

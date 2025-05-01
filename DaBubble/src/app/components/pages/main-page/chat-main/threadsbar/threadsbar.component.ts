import { Component } from '@angular/core';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-threadsbar',
  imports: [ChatInputComponent, CommonModule],
  templateUrl: './threadsbar.component.html',
  styleUrl: './threadsbar.component.scss',
})
export class ThreadsbarComponent {
  isOpen: boolean = true;
}

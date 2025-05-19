import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';



@Component({
  standalone: true,
  selector: 'app-chat-input',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent implements OnInit {
  showEmojiMenu: boolean = false;


  chatInputGroup = new FormGroup({
    chatInput: new FormControl('')
  })

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-container') && !target.closest('.emoji-button')) {
      this.showEmojiMenu = false;
    }
  }

  constructor() {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.chatInputGroup.invalid) {
      console.warn("Form ist ungültig, sende trotzdem.");
    }
    console.log("Absenden:", this.chatInputGroup.value);

  }
}

import { Component, Input } from '@angular/core';
import { ChatMessaggeEmoji } from '../../../../../../../types/types';

@Component({
  selector: 'app-single-emoji',
  imports: [],
  templateUrl: './single-emoji.component.html',
  styleUrl: './single-emoji.component.scss'
})
export class SingleEmojiComponent {
  @Input() emoji:ChatMessaggeEmoji = {emojiId:'', userIdCount:[]};

  getEmojiCount() {
    return this.emoji.userIdCount.length;
  }
}

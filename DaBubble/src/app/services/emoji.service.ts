import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {

  //state booleans
  showEmojiMenu: boolean = false;
  hasInteracted: boolean = false;

  constructor() { }

  /**
 * toggles the emoji picker
 * 
 * @param event mouseclick event
 */
  toggleEmojiMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.hasInteracted = true;
    this.showEmojiMenu = !this.showEmojiMenu;
  }

  /**
   * 
   * @param event emoji object
   * @param chatInputGroup the chatInputGroup of the input in chat-input.component.ts
   */
  addEmoji(event: any, chatInputGroup:any) {
   const emoji = event.emoji.native;
    const current = chatInputGroup.get('message')?.value || '';
    chatInputGroup.get('message')?.setValue(current + emoji);
    this.showEmojiMenu = false;
  }
}

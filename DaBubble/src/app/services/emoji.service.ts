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
}

import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { EmojiFnRegulator, EmojiMenuChatType } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {

  //signals
  showEmojiMenu: WritableSignal<boolean> = signal(false);
  hasInteracted: WritableSignal<boolean> = signal(false);

  /**
   * a variable wich regulates the handleEmojiAction()
   */
  emojiFnRegulator: WritableSignal<EmojiFnRegulator> = signal(EmojiFnRegulator.addEmojiToText);

  //test
  /**
   * a variable that changes and determines in which chat type the emoji menu was opened
   */
  emojiMenuChatType: WritableSignal<EmojiMenuChatType> = signal(EmojiMenuChatType.fromMain);
  //testend

  constructor() { }

  /**
  * toggles the emoji picker
  * 
  * @param event mouseclick event
  */
  toggleEmojiMenu(event: MouseEvent, emojiFnRegulatorInput: EmojiFnRegulator): void {
    event.stopPropagation();
    this.hasInteracted.set(true);
    this.showEmojiMenu.set(!this.showEmojiMenu());
    this.emojiFnRegulator.set(emojiFnRegulatorInput);
  }

  /**
   * adds an emoji to the text-area field of the chat-input-component
   * 
   * @param event emoji object
   * @param chatInputGroup the chatInputGroup of the input in chat-input.component.ts
   */
  addEmoji(event: any, chatInputGroup: any): void {
    const emoji = event.emoji.native;
    const current = chatInputGroup.get('message')?.value || '';
    chatInputGroup.get('message')?.setValue(current + emoji);
    this.showEmojiMenu.set(false);
  }

  //hier kommt noch die dunktion rein die emojis zu den nachrichten added
  addReaction(event: any): void {
    console.log('addReaction trigger: ', event);
    this.showEmojiMenu.set(false);
  }

  /**
   * Controls which function is executed based on a state-signal named: EmojiFnRegulator
   * 
   * @param event emoji object
   * @param chatInputGroup optional: the chatInputGroup of chat-input-component 
   */
  handleEmojiAction(event: any, chatInputGroup?: any): void {
    if (this.emojiFnRegulator() === EmojiFnRegulator.addReaction) {
      this.addReaction(event);
    }
    else if (this.emojiFnRegulator() === EmojiFnRegulator.addEmojiToText) {
      this.addEmoji(event, chatInputGroup);
    }
  }

}

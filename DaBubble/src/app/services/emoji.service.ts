import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { EmojiFnRegulator, ChatInputType, ToggleEmojiMenuObject } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {
  //test 
  toggleEmojiMenuObject: ToggleEmojiMenuObject = {
    inputType: ChatInputType.fromMain,
    isOpen: null
  }

  //testend

  //signals
  showEmojiMenu: WritableSignal<ToggleEmojiMenuObject> = signal(this.toggleEmojiMenuObject);
  hasInteracted: WritableSignal<boolean> = signal(false);

  /**
   * a variable wich regulates the handleEmojiAction()
   */
  emojiFnRegulator: WritableSignal<EmojiFnRegulator> = signal(EmojiFnRegulator.addEmojiToText);

  /**
   * a variable that changes and determines in which chat type the emoji menu was opened
   */
  chatInputType: WritableSignal<ChatInputType> = signal(ChatInputType.fromMain);



  constructor() { }

  /**
  * toggles the emoji picker
  * 
  * @param event mouseclick event
  */
  toggleEmojiMenu(event: MouseEvent, emojiFnRegulatorInput: EmojiFnRegulator, toggleEmojiMenuObject: ToggleEmojiMenuObject): void {

    if (this.showEmojiMenu().inputType !== toggleEmojiMenuObject.inputType) {
      this.showEmojiMenu.set(toggleEmojiMenuObject)
    }

    let isOpen = this.showEmojiMenu().isOpen;
    event.stopPropagation();
    this.hasInteracted.set(true);
    this.showEmojiMenu.set({
      ...this.showEmojiMenu(),
      isOpen: !isOpen
    });
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
    let isOpen = this.showEmojiMenu().isOpen;
    chatInputGroup.get('message')?.setValue(current + emoji);
    this.showEmojiMenu.set({
      ...this.showEmojiMenu(),
      isOpen: !isOpen
    });
  }

  //hier kommt noch die dunktion rein die emojis zu den nachrichten added
  addReaction(event: any): void {
    console.log('addReaction trigger: ', event);
    let isOpen = this.showEmojiMenu().isOpen;
    this.showEmojiMenu.set({
      ...this.showEmojiMenu(),
      isOpen: !isOpen
    });
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

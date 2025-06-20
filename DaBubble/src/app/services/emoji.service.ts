import { Injectable, inject, WritableSignal, effect, signal } from '@angular/core';
import { EmojiFnRegulator, ChatInputType, ToggleEmojiMenuObject, ChatMessaggeEmoji, AppUser, Message } from '../types/types';
import { FirestoreService } from './firestore.service';
import { UsersService } from './users.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {

  toggleEmojiMenuObject: ToggleEmojiMenuObject = {
    inputType: ChatInputType.fromMain,
    isOpen: null
  }

  //injects
  firestoreService: FirestoreService = inject(FirestoreService);
  usersService: UsersService = inject(UsersService);

  //signals
  showEmojiMenu: WritableSignal<ToggleEmojiMenuObject> = signal(this.toggleEmojiMenuObject);
  hasInteracted: WritableSignal<boolean> = signal(false);
  currentUserSignal = toSignal(this.usersService.currentUser$);

  /**
   * a variable wich regulates the handleEmojiAction()
   */
  emojiFnRegulator: WritableSignal<EmojiFnRegulator> = signal(EmojiFnRegulator.addEmojiToText);

  /**
   * a variable that changes and determines in which chat type the emoji menu was opened
   */
  chatInputType: WritableSignal<ChatInputType> = signal(ChatInputType.fromMain);
  
  //others

  /**
   * a variable wich stores the currentUser
   */
  user:any;

  /**
   * this variable stores the clicked message to add an reaction to
   */
  message!:Message;

  constructor() {
    effect(() => {
      this.user = this.currentUserSignal();      
    })
  }

  /**
  * toggles the emoji picker
  * 
  * @param event mouseclick event
  */
  toggleEmojiMenu(event: MouseEvent, emojiFnRegulatorInput: EmojiFnRegulator, toggleEmojiMenuObject: ToggleEmojiMenuObject, message?:Message): void {

    if (this.showEmojiMenu().inputType !== toggleEmojiMenuObject.inputType) {
      this.showEmojiMenu.set(toggleEmojiMenuObject)
    }
    event.stopPropagation();
    this.hasInteracted.set(true);
    this.toggleEmojiMenuHelper();
    this.emojiFnRegulator.set(emojiFnRegulatorInput);

    if (message) {
      this.message = message;
    }
  }

  /**
   * reverses the isOpen-key of emojiToggleObject
   */
  toggleEmojiMenuHelper() {
    let isOpen = this.showEmojiMenu().isOpen;
    this.showEmojiMenu.set({
      ...this.showEmojiMenu(),
      isOpen: !isOpen
    });
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

    this.toggleEmojiMenuHelper();
  }

  /**
   * adds a new document to firestore with the emoji-reaction-object as value in the collection emojis
   * 
   * @param event the emoji event
   * @param messageId the id of the message wich should be getting an emoji-reaction
   */
  addReaction(event: any, message:Message): void {
    this.firestoreService.addDoc('emojis', this.createEmojiObject(event, message));

    this.toggleEmojiMenuHelper();
  }

  /**
   * creates the emoji object, this object contains the value of the doc in the emoji-collection on firestore
   * 
   * @param event the emoji event
   * @param messageId the id of the message wich should be getting an emoji-reaction
   * @returns the emoji objekt
   */
  createEmojiObject(event: any, message: Message): ChatMessaggeEmoji {
    console.log('das ist die message fr das emoji object: ----->', message);
    
    return {
      emoji: event.emoji.native,
      messageId: message.messageId,
      userIds: message.userIds,
      creatorId: this.user.userId
    }
  }

  /**
   * Controls which function is executed based on a state-signal named: EmojiFnRegulator
   * 
   * @param event emoji object
   * @param chatInputGroup optional: the chatInputGroup of chat-input-component 
   */
  handleEmojiAction(event: any, chatInputGroup?: any, message?:Message): void {
    console.log('message from ahndleemoji', message);
    
    if (this.emojiFnRegulator() === EmojiFnRegulator.addReaction) {
      this.addReaction(event, message!);
    }
    else if (this.emojiFnRegulator() === EmojiFnRegulator.addEmojiToText) {
      this.addEmoji(event, chatInputGroup);
    }
  }

}

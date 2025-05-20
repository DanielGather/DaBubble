import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener, inject, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../../../services/users.service';
import { ChatType } from '../../../../../types/types';
import { GetUrlChatidService } from '../../../../../services/get-url-chatid.service';
import { FirestoreService } from '../../../../../services/firestore.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChannelsService } from '../../../../../services/channels.service';


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
export class ChatInputComponent implements OnInit, OnDestroy {
  //services
  usersService = inject(UsersService);
  urlService = inject(GetUrlChatidService);
  firestoreService = inject(FirestoreService);
  channelService = inject(ChannelsService);

  //unsubscribe variables
  private destroy$ = new Subject<void>();

  //state booleans
  showEmojiMenu: boolean = false;

  //chattype
  chatType: ChatType = ChatType.default;

  //data storage variables
  channelData: any;

  //formgroup
  chatInputGroup = new FormGroup({
    channelId: new FormControl(''),
    privatChatId: new FormControl(''),
    threadsId: new FormControl(''),
    creatorId: new FormControl(''),
    timestamp: new FormControl(0),
    message: new FormControl(''),
    userIds: new FormControl()
  })

  /**
   * closes the emoji menu, if user is clicking outside of .menu-container & .emoji-button
   * 
   * @param event just an event, it triggers if the user is clicking outside of .menu-container & .emoji-button
   */
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
    this.setCreatorIdOfMessageObject();
    this.setChatIdOfMessageObject();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.chatInputGroup.invalid) {
      console.warn("Form ist ungültig, sende trotzdem.");
    }
    else if (this.usersService.currentUserId && this.chatInputGroup.valid && this.urlService.currentParams.chatType != null) {

      //adds a timestamp to the formcontrol
      this.chatInputGroup.get('timestamp')?.setValue(new Date().getTime());

      this.addNewMessageToFirestoreCollection();

      //console log
      console.log("Absenden:", this.chatInputGroup.value);
    }
  }

  /**
   * subscribes the parameters of the url.
   * if the chattype is private or channel, the case will set the chat-id in the right formcontrol.
   * it also will set the userids array of the formcontrol, with the joined users in a channel.
   * 
   * future: (we need to think about updating this function in the future because it only sets the userids if it is a channel-chat) 
   */
  setChatIdOfMessageObject() {
    this.urlService.urlParameter$
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params.chatType && params.chatId) {
          switch (params.chatType) {
            case 'private':
              this.chatInputGroup.get('privatChatId')?.setValue(params.chatId);
              break;

            case 'channel':
              this.chatInputGroup.get('channelId')?.setValue(params.chatId);
              break;

            default:
              break;
          }

          if (params.chatType === 'channel' && params.chatId) {
            this.channelService.getChannelById$(params.chatId)
              .pipe(takeUntil(this.destroy$))
              .subscribe(channel => {
                this.channelData = channel;
                this.chatInputGroup.get('userIds')?.setValue(channel.userIds);
              });
          }

        }
      })
  }

  /**
   * sets the userid of the users object, to the formcontrol creatorid.
   */
  setCreatorIdOfMessageObject() {
    this.usersService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.chatInputGroup.get('creatorId')?.setValue(user.userId!);
        }
      });
  }

  /**
   * converts the formgroup to a json object and adds a new doc in the firestore collection 'messages'.
   */
  addNewMessageToFirestoreCollection() {
    let formData = this.chatInputGroup.getRawValue();
    this.firestoreService.addDoc('messages', formData)
      .then(() => { this.chatInputGroup.get('message')?.reset(); });
  }
}

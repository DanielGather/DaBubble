import {
    Component,
    Input,
    AfterViewInit,
    ViewChild,
    ElementRef,
    inject,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import {
    ChatType,
    MessageType,
    AppUser,
    Message
} from '../../../../../types/types';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { MessagesDataService } from '../../../../../services/messages-data.service';
import { UsersService } from '../../../../../services/users.service';
import { FirestoreService } from '../../../../../services/firestore.service';
import { OtherUsersPopupComponent } from '../../shared/other-users-popup/other-users-popup.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-chat-messages-container',
    imports: [ChatInfoComponent, ChatMessageComponent, OtherUsersPopupComponent, CommonModule],
    templateUrl: './chat-messages-container.component.html',
    styleUrl: './chat-messages-container.component.scss',
})
export class ChatMessagesContainerComponent implements AfterViewInit, OnChanges {

    //injects
    firestore = inject(FirestoreService);
    messageDataService = inject(MessagesDataService);
    userService = inject(UsersService);

    //types
    chatType = ChatType;
    messageType = MessageType;

    //Inputs
    /**
     * is used to identify if the current chat is a private or a channel chat.
     */
    @Input() chatTypeInput: ChatType = ChatType.default;

    /**
     * this is the array that contains the chat messages
     */
    @Input() chatMessages: Array<Message> = [];

    @Input() isThread: boolean = false;

    //Viewchilds
    /**
     * an elementreference to the message field. (messages are rendered in here)
     */
    @ViewChild('messageField') private messageField!: ElementRef;

    //Other
    /**
     * a help variable to make things clearer.
     * contains, currentUserId.
     */
    userId = this.userService.currentUserId;

    clickedUserData: AppUser | null = null;
    showUserPopupVisible: boolean = false;

    ngAfterViewInit(): void {
        this.scrollToBottom();
        setTimeout(() => {
           this.scrollToBottom(); 
        }, 0);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['chatMessages'] && changes['chatMessages'].currentValue) {
            setTimeout(() => this.scrollToBottom(), 200);
        }
    }

    /**
     * is used to scroll to the bottom of the message container to see the newest messages
     */
    scrollToBottom(): void {
        const el = this.messageField?.nativeElement;
        if (el) {
            el.scrollTop = el.scrollHeight;
            console.log('scroll HEIGHT: ', el.scrollHeight, el.scrollTop);
        }
    }

    async loadUserData(id: string) {
        const user = await this.firestore.getSingleCollection<AppUser>('users', id);
        if (user) {
            this.clickedUserData = user;
            this.showUserPopupVisible = true;
        }
    }
}

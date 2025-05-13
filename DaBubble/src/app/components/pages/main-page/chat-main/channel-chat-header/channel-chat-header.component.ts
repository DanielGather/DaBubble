import { Component, inject, ElementRef, HostListener } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { ChannelEditPopupComponent } from '../channel-edit-popup/channel-edit-popup.component';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from '../../../../shared/form-input/form-input.component';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { PopOverComponent } from '../../shared/pop-over/pop-over.component';
import { UsersService } from '../../../../../services/users.service';
import { map, Observable, take } from 'rxjs';
import { AppUser } from '../../../../../types/types';

@Component({
  selector: 'app-channel-chat-header',
  imports: [
    ButtonComponent,
    ChannelEditPopupComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './channel-chat-header.component.html',
  styleUrl: './channel-chat-header.component.scss',
})
export class ChannelChatHeaderComponent {
  // userService: UsersService = inject(UsersService);
  showChannelPopup = false;
  showUserPopup = false;
  users: UsersService = inject(UsersService);
  usersList$: Observable<AppUser[]> = this.getSortedUser();
  usersAddedToChannel: string[] = [];
  permanentUserList: AppUser[] = [];

  constructor(private elementRef: ElementRef) {
    console.log('channelChat user list' + this.usersList$);
  }

  /**
   * activate an observable to get user data
   */
  ngOnInit() {
    this.usersList$
      .pipe(take(1)) // get it once, then close it
      .subscribe((users) => {
        this.permanentUserList = users;
        console.log('Statisches Array:', this.permanentUserList);
      });
  }

  /**
   * toggle popup
   */
  toggleAddUserToChannelPopUp() {
    this.showUserPopup = !this.showUserPopup;
  }

  /**
   * add user to channel
   * @param id
   */
  addUserToChannel(id: string) {
    console.log('ID', id);
    this.usersAddedToChannel.push(id);
    console.log(this.usersAddedToChannel);
  }

  /**
   * get user from firebase and sort it
   * @returns
   */
  getSortedUser() {
    console.log('sorted', this.users.usersList$);
    return this.users.usersList$.pipe(
      map((list) =>
        [...list].sort((a, b) =>
          a.firstName.localeCompare(b.firstName, 'de', { sensitivity: 'base' })
        )
      )
    );
  }

  getAvatar(avatarId: number) {
    switch (avatarId) {
      case 1:
        return 'img/user_1.png';
      case 2:
        return 'img/user_2.png';
      case 3:
        return 'img/user_3.png';
      case 4:
        return 'img/user_4.png';
      case 5:
        return 'img/user_5.png';
      case 6:
        return 'img/user_6.png';
    }
    return 'img/user_1.png';
  }

  /**
   * open channel edit
   */
  openChannelPopup() {
    this.showChannelPopup = true;
  }

  /**
   * close channel edit
   */
  closeChannelPopup() {
    this.showChannelPopup = false;
  }

  /**
   * Closes open popups when a click occurs outside the component's DOM element.
   * @param event - The MouseEvent triggered by a click anywhere in the document.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.showUserPopup) {
      this.showUserPopup = false;
    }
    if (!clickedInside && this.showChannelPopup) {
      this.showChannelPopup = false;
    }
  }
}

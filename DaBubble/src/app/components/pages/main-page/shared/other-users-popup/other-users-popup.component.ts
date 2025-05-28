import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { UsersService } from '../../../../../services/users.service';
import { AppUser } from '../../../../../types/types';
import { FirestoreService } from '../../../../../services/firestore.service';

@Component({
  selector: 'app-other-users-popup',
  imports: [NgStyle, FormsModule, CommonModule, ButtonComponent],
  templateUrl: './other-users-popup.component.html',
  styleUrl: './other-users-popup.component.scss',
})
export class OtherUsersPopupComponent {
  @Input() userData: AppUser | null = null;

  active: boolean = true;
  green = '#92c83e';
  userService = inject(UsersService);
  firestoreService = inject(FirestoreService);
  fullName: string = '';
  currentUser$: Observable<AppUser | null> = this.userService.currentUser$;

  constructor() {
    this.currentUser$.subscribe();
  }

  /**
   * Output event to notify the ChannelEditComponent to close the profile popup.
   */

  @Output() closeUserPopup = new EventEmitter<void>();
  /**
   * Sends a signal ("closeUserPopup") to the header component to close the user profile on click.
   * Emits the `closeUserPopup` event to notify the parent component.
   */
  closeClickedUserProfile() {
    this.closeUserPopup.emit();
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
}

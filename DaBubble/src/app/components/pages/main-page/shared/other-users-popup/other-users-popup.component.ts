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
  @Input() creatorId: string = '';

  active: boolean = true;
  green = '#92c83e';
  userService = inject(UsersService);
  firestoreService = inject(FirestoreService);
  fullName: string = '';
  currentUser$: Observable<AppUser | null> = this.userService.currentUser$;
  creatorData: AppUser | null = null;

  constructor() {
    this.currentUser$.subscribe();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['creatorId'] && this.creatorId) {
      this.creatorData = await this.firestoreService.getSingleSnapshot<AppUser>(
        'users',
        this.creatorId
      );
    }
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
}

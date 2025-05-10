import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { UsersService } from '../../../../../services/users.service';
import { Observable } from 'rxjs';
import { AppUser } from '../../../../../types/types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-user',
  imports: [NgStyle, FormsModule, CommonModule],
  templateUrl: './profile-other-users.component.html',
  styleUrl: './profile-other-users.component.scss',
})
export class ProfileUserComponent {
  active: boolean = true;
  green = '#92c83e';
  userService = inject(UsersService);

  currentUser$: Observable<AppUser | null> = this.userService.currentUser$;

  constructor() {
    this.currentUser$.subscribe((user) => {
      console.log('Aktueller Benutzer:', user);
    });
  }

  /**
   * Output event to notify the HeaderComponent to close the profile popup.
   */
  @Output() close = new EventEmitter<void>();

  /**
   * Sends a signal ("close") to the header component to close the user profile on click.
   * Emits the `close` event to notify the parent component.
   */
  closeProfile() {
    this.close.emit();
  }
}

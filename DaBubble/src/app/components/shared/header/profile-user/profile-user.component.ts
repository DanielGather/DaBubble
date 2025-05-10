import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AppUser } from '../../../../types/types';
import { UsersService } from '../../../../services/users.service';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-profile-user',
  imports: [NgStyle, FormsModule, CommonModule, ButtonComponent],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss',
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

import { Component, EventEmitter, Output } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-profile-user',
  imports: [NgStyle],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss',
})
export class ProfileUserComponent {
  active: boolean = true;
  green = '#92c83e';

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

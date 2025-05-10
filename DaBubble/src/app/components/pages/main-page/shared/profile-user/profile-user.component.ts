import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { UsersService } from '../../../../../services/users.service';
import { AppUser } from '../../../../../types/types';
import { FirestoreService } from '../../../../../services/firestore.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile-user',
  imports: [NgStyle, FormsModule, CommonModule, ButtonComponent],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss',
})
export class ProfileUserComponent {
  active: boolean = true;
  editVisible = false;
  green = '#92c83e';
  userService = inject(UsersService);
  firestoreService = inject(FirestoreService);
  fullName: string = '';
  currentUser$: Observable<AppUser | null> = this.userService.currentUser$;

  constructor() {
    this.currentUser$.subscribe((user) => {
      if (user) {
        console.log('User:', user);
        console.log('User-ID:', user.userId); // ← hier ist der "Trick"
      }
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
    setTimeout(() => {
      this.editVisible = false;
    }, 500);
  }

  switchEditVisibility() {
    this.currentUser$
      .subscribe((user) => {
        if (user) {
          this.fullName = `${user.firstName} ${user.lastName}`;
        }
      })
      .unsubscribe();
    this.editVisible = !this.editVisible;
  }

async saveUserName() {
  console.log('funktion start');

  const user = await firstValueFrom(this.currentUser$);

  if (!user?.userId) {
    console.warn('Keine gültige User-ID vorhanden!');
    return;
  }

  if (!this.fullName || this.fullName.trim() === '') {
    console.warn('Vollständiger Name fehlt.');
    return;
  }

  // Trenne den eingegebenen Namen in Vor- und Nachname
  const [firstName, ...lastNameParts] = this.fullName.trim().split(' ');
  const lastName = lastNameParts.join(' ') || '';

  await this.firestoreService.updateDoc('users', user.userId, {
    firstName: firstName,
    lastName: lastName
  });

  console.log('Name erfolgreich aktualisiert!');
  this.switchEditVisibility(); // zurück zur Ansicht
}
}

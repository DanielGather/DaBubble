import { Component, OnInit, inject } from '@angular/core';
import { ProfileUserComponent } from '../../pages/main-page/profile-user/profile-user.component';
import { SearchbarComponent } from '../../pages/main-page/shared/searchbar/searchbar.component';
import { DaBubbleLogoComponent } from '../da-bubble-logo/da-bubble-logo.component';
import { UsersService } from '../../../services/users.service';
import { AppUser } from '../../../types/types';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-header',
  imports: [
    SearchbarComponent,
    ProfileUserComponent,
    DaBubbleLogoComponent,
    NgIf,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  headerPopup: boolean = false;
  userProfilePopup: boolean = false;
  usersService = inject(UsersService);
  authService = inject(AuthenticationService);

  currentUser$: Observable<AppUser | null> = this.usersService.currentUser$;

  ngOnInit(): void {
    console.log('DAS IST DER GLOBAL USER: ', this.usersService.currentUser$);
  }

  togglePopup() {
    this.headerPopup = !this.headerPopup;
  }

  toggleUserProfile() {
    this.userProfilePopup = !this.userProfilePopup;
  }

  userLogout() {
    this.authService.logoutService();
  }
}

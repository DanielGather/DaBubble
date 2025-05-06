import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileUserComponent } from '../../pages/main-page/profile-user/profile-user.component';
import { SearchbarComponent } from '../../pages/main-page/shared/searchbar/searchbar.component';
import { DaBubbleLogoComponent } from '../da-bubble-logo/da-bubble-logo.component';
import { DropdownComponent } from '../../pages/main-page/shared/dropdown/dropdown.component';
import { UsersService } from '../../../services/users.service';
import { AppUser } from '../../../types/types';

@Component({
  selector: 'app-header',
  imports: [
    SearchbarComponent,
    ProfileUserComponent,
    RouterLink,
    DaBubbleLogoComponent,
    DropdownComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  headerPopup: boolean = false;
  userProfilePopup: boolean = false;
  usersService = inject(UsersService);

  /**
   * Added noDataUser to get displayed if "currenTUser" to prevent app crash.
   */
  noDataUser = {
    firstName: 'No',
    lastName: 'Data',
  };

  currentUser: AppUser = this.usersService.currentUser! || this.noDataUser;

  ngOnInit(): void {
    console.log('global User: ', this.usersService.currentUser);
  }

  togglePopup() {
    this.headerPopup = !this.headerPopup;
  }

  toggleUserProfile() {
    this.userProfilePopup = !this.userProfilePopup;
    console.log('test');
  }
}

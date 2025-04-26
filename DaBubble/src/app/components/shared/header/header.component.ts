import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileUserComponent } from '../../pages/main-page/profile-user/profile-user.component';
import { SearchbarComponent } from '../../pages/main-page/shared/searchbar/searchbar.component';


@Component({
  selector: 'app-header',
  imports: [SearchbarComponent, ProfileUserComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  headerPopup: boolean = false;
  userProfilePopup: boolean = false;

  togglePopup() {
    this.headerPopup = !this.headerPopup;
  }

  toggleUserProfile() {
    this.userProfilePopup = !this.userProfilePopup;
    console.log('test');
  }
}

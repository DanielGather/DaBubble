import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileUserComponent } from '../../pages/main-page/profile-user/profile-user.component';
import { SearchbarComponent } from '../../pages/main-page/shared/searchbar/searchbar.component';
import { DaBubbleLogoComponent } from '../da-bubble-logo/da-bubble-logo.component';
import { DropdownComponent } from '../../pages/main-page/shared/dropdown/dropdown.component';
import { UsersService } from '../../../services/users.service';
import { AppUser } from '../../../types/types';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';



@Component({
  selector: 'app-header',
  imports: [SearchbarComponent, ProfileUserComponent, RouterLink, DaBubbleLogoComponent, DropdownComponent,NgIf,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{
  headerPopup: boolean = false;
  userProfilePopup: boolean = false;
  usersService = inject(UsersService);
  currentUser$: Observable<AppUser | null> = this.usersService.currentUser$;

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

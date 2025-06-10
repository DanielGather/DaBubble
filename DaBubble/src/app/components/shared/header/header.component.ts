import { Component, OnInit, inject } from '@angular/core';
import { SearchbarComponent } from '../../pages/main-page/shared/searchbar/searchbar.component';
import { DaBubbleLogoComponent } from '../da-bubble-logo/da-bubble-logo.component';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication.service';
import { AppUser } from '../../../types/types';
import { UsersService } from '../../../services/users.service';
import { ProfileUserComponent } from '../../pages/main-page/shared/profile-user/profile-user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadService } from '../../../services/thread.service';
import { GetUrlChatidService } from '../../../services/get-url-chatid.service';
import { ResponsiveService } from '../../../services/responsive.service';

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
  threadService = inject(ThreadService);
  urlService = inject(GetUrlChatidService);
  responsiveService = inject(ResponsiveService);

  currentUser$: Observable<AppUser | null> = this.usersService.currentUser$;

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    console.log('DAS IST DER GLOBAL USER: ', this.usersService.currentUser$);
  }

  goBack() {
    let threadId = this.urlService.urlParameters.threadsId;
    let chatId = this.urlService.urlParameters.chatId;
    console.log(threadId, chatId);

    if (threadId) {
      this.threadService.closeThread();
      this.router.navigate(['/chat', 'channel', chatId]);
    }
    if (chatId && !threadId) {
      this.router.navigate(['/chat']);
    }
    if (!threadId && !chatId) {
      this.responsiveService.goBack.set(true);
    }
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

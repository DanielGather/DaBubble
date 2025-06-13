import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { SearchbarComponent } from '../../pages/main-page/shared/searchbar/searchbar.component';
import { DaBubbleLogoComponent } from '../da-bubble-logo/da-bubble-logo.component';
import { filter, Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication.service';
import { AppUser } from '../../../types/types';
import { UsersService } from '../../../services/users.service';
import { ProfileUserComponent } from '../../pages/main-page/shared/profile-user/profile-user.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ThreadService } from '../../../services/thread.service';
import { GetUrlChatidService } from '../../../services/get-url-chatid.service';
import { ResponsiveService } from '../../../services/responsive.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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

  breakpointObserver = inject(BreakpointObserver);

  currentUser$: Observable<AppUser | null> = this.usersService.currentUser$;

  constructor(private route: ActivatedRoute, private router: Router) {}

  isSmallScreen = signal(false);
  currentPath = signal('');

  ngOnInit(): void {
    console.log('DAS IST DER GLOBAL USER: ', this.usersService.currentUser$);
    this.initScreenObserver();
    this.initRouterListener();
  }

  initScreenObserver() {
    this.breakpointObserver
      .observe([`(max-width: 768px)`])
      .subscribe((result) => {
        this.isSmallScreen.set(result.matches);
      });
  }

  initRouterListener() {
    this.currentPath.set(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentPath.set(event.urlAfterRedirects);
      });
  }

  shouldShowLogo = computed(() => {
    const path = this.currentPath();
    const isChatPage =
      path.includes('/chat/private') || path.includes('/chat/channel');
    return !(this.isSmallScreen() && isChatPage);
  });

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

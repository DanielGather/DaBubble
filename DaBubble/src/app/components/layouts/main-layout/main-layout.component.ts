import { Component, inject, OnInit, computed } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../pages/main-page/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { UsersService } from '../../../services/users.service';
import { ResponsiveService } from '../../../services/responsive.service';
import { ThreadService } from '../../../services/thread.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, SidebarComponent, RouterOutlet, NgClass],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  /**
   * authentication service variable
   */
  authService = inject(AuthenticationService);
  threadbarService = inject(ThreadService);
  responsiveService = inject(ResponsiveService);

  //thread boolean states
  readonly isActive = this.threadbarService.threadState;
  readonly isThreadbarOpen = computed(() => this.isActive().isOpen);
  /**
   * usersservice variable
   */
  usersService = inject(UsersService);

  async ngOnInit(): Promise<void> {
    console.log('OBSERVER', this.responsiveService.breakpointObserver);

    if (
      !this.usersService.currentUser$ ||
      this.usersService.currentUser$ == null
    ) {
      await this.authService.observeAuthState();
      console.log('currentUser is: ', this.usersService.currentUser$);
    }
  }

  async ngAfterViewInit() {}

  get sidebarVisible(): boolean {
    return this.responsiveService.showSidebar();
  }
}

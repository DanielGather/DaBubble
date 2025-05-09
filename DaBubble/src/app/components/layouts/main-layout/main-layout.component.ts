import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../pages/main-page/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { UsersService } from '../../../services/users.service';
@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  /**
   * authentication service variable
   */
  authService = inject(AuthenticationService);

  /**
   * usersservice variable
   */
  usersService = inject(UsersService);

  async ngOnInit(): Promise<void> {
    if (
      !this.usersService.currentUser$ ||
      this.usersService.currentUser$ == null
    ) {
      await this.authService.observeAuthState();
      console.log('currentUser is: ', this.usersService.currentUser$);
    }
  }

  async ngAfterViewInit() {}
}

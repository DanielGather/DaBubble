import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../pages/main-page/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { UsersService } from '../../../services/users.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirestoreService } from '../../../services/firestore.service';
import { AppUser } from '../../../types/types';
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
  firestoreService = inject(FirestoreService);

  /**
   * usersservice variable
   */
  usersService = inject(UsersService);

  userObject?: AppUser;

  async ngOnInit(): Promise<void> {
    if (
      !this.usersService.currentUser$ ||
      this.usersService.currentUser$ == null
    ) {
      await this.authService.observeAuthState();
      console.log('currentUser is: ', this.usersService.currentUser$);
    }
  }

  async ngAfterViewInit() {
    // await this.setStatus();
  }

  // async setStatus() {
  //   try {
  //     const user = await this.getCurrentUser();
  //     if (!user) {
  //       console.log('Kein angemeldeter Benutzer');
  //       return;
  //     }
  //     this.usersService.currentUserId = user.uid;
  //     const userData = await this.loadUserData(
  //       this.usersService.currentUserId!
  //     );
  //     if (!userData) return;
  //     this.userObject = this.userObjectData(userData);
  //   } catch (error) {
  //     console.error('Fehler beim Setzen des Status:', error);
  //   }
  // }

  // getCurrentUser(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const auth = getAuth();
  //     if (auth.currentUser) {
  //       resolve(auth.currentUser);
  //       return;
  //     }
  //     const unsubscribe = onAuthStateChanged(
  //       auth,
  //       (user) => {
  //         unsubscribe();
  //         resolve(user);
  //       },
  //       reject
  //     );
  //   });
  // }

  // /**
  //  * Lädt die Benutzerdaten aus Firestore
  //  */
  // private async loadUserData(userId: string) {
  //   const userData = await this.firestoreService.getSingleDoc('users', userId);

  //   if (!userData) {
  //     console.log('Kein Benutzer gefunden');
  //     return null;
  //   }

  //   return userData;
  // }
}

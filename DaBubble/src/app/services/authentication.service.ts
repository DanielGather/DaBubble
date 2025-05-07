import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
} from 'firebase/auth';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  usersService = inject(UsersService);

  constructor(private auth: Auth, private router: Router) {}

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login(email: string, password: string) {
    try {
      this.usersService.currentUserCredential = await this.signIn(
        email,
        password
      );
      this.usersService.currentUserId =
        this.usersService.currentUserCredential!.user.uid;

      const user = await this.setCurrentUser();
      this.usersService.setCurrentUser(user); // hier Subject updaten

      await this.router.navigateByUrl('/chat/private');
    } catch (error) {
      console.log('login error:', error);
    }
  }

  async setCurrentUser() {
    return this.usersService.firestoreService.getSingleCollection(
      'users',
      this.usersService.currentUserId!
    ) as any;
  }

  async observeAuthState() {
    console.log('auth state listener active!!!');

    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        await this.router.navigateByUrl('/chat/private');
        this.usersService.currentUserId = user.uid;

        const appUser = await this.setCurrentUser();
        this.usersService.setCurrentUser(appUser); // hier Subject updaten
      } else {
        this.usersService.currentUserId = null;
        this.usersService.setCurrentUser(null); // Subject auf null setzen
        await this.router.navigateByUrl('/login');
      }
    });
  }

  async logoutService(): Promise<void> {
    try {
      await this.auth.signOut();
      await this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}

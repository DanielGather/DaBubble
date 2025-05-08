import { Injectable, inject, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
} from 'firebase/auth';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  usersService = inject(UsersService);
  firestoreService = inject(FirestoreService);

  private userIdSignal = signal<string>('');

  public userId = this.userIdSignal.asReadonly();

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

      this.usersService.observeCurrentUser(this.usersService.currentUserId!);

      await this.router.navigateByUrl('/chat/private');
    } catch (error) {
      console.log('login error:', error);
    }
  }

  async setCurrentUser() {
    console.log('guade ID', this.usersService.currentUserId);
    return this.firestoreService.getSingleCollection(
      'users',
      this.usersService.currentUserId!
    ) as any;
  }

  async observeAuthState() {
    onAuthStateChanged(this.auth, async (user) => {
      const currentUrl = this.router.url;
      if (user) {
        this.userIdSignal.set(user.uid);
        if (!currentUrl.includes('/signup')) {
          await this.router.navigateByUrl('/chat/private');
        }

        this.usersService.currentUserId = user.uid;

        this.usersService.observeCurrentUser(user.uid);
      } else {
        this.usersService.currentUserId = null;
        this.usersService.clearCurrentUser();
        await this.router.navigateByUrl('/login');
      }
    });
  }

  async logoutService(): Promise<void> {
    try {
      await this.auth.signOut();
      this.usersService.clearCurrentUser();
      await this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}

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

  currentUserId: string = '';

  constructor(private auth: Auth, private router: Router) {
   console.log('in Auth userId: ' + this.userId);
    console.log('in Auth currentUserId: ' + this.currentUserId);
   
    
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login(email: string, password: string) {
    try {
      await this.signIn(email, password);
      await this.router.navigateByUrl('/chat/private');
    } catch (error) {
      console.log('login error:', error);
    }
  }

  async setCurrentUser() {
    return this.firestoreService.getSingleCollection(
      'users',
      this.usersService.currentUserId!
    ) as any;
  }

  async observeAuthState() {
    onAuthStateChanged(this.auth, async (user) => {
      const currentUrl = this.router.url;
      if (user) {
        localStorage.setItem('id', user.uid);
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

import { Injectable, inject, signal } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
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
  loginError: string = '';

  /**
   * fraglich ob das noch verwendet wird, eventuell löschen
   */
  private userIdSignal = signal<string>('');

  /**
   * fraglich ob das noch verwendet wird, eventuell löschen
   */
  public userId = this.userIdSignal.asReadonly();

  currentUserId: string = '';

  /**
   * werden die console logs noch gebraucht?
   * @param auth
   * @param router
   */
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

  googleAuthenticate() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
    });
  }

  /**
   * router? sollte zu chat leiten ohne private
   * @param email
   * @param password
   */
  async login(email: string, password: string) {
    try {
      await this.signIn(email, password);
      await this.router.navigateByUrl('/chat/private');
    } catch (error: any) {
      if (error.code == 'auth/invalid-credential') {
        this.loginError =
          'User existiert nicht oder Passwort ist nicht korrekt.';
      }
    }
  }

  /**
   * ist das noch in gebrauch, wenn ja, eventuell verschieben in user.service
   * @returns
   */
  async setCurrentUser() {
    return this.firestoreService.getSingleCollection(
      'users',
      this.usersService.currentUserId!
    ) as any;
  }

  /**
   * prüft ob token vorhanden, und logged automatisch ein
   */
  async observeAuthState() {
    onAuthStateChanged(this.auth, async (user) => {
      const currentUrl = this.router.url;
      if (user) {
        localStorage.setItem('id', user.uid);
        if (!currentUrl.includes('/signup')) {
          await this.router.navigateByUrl('/chat');
        }
        // wird diese zeile noch benötigt?
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
    let userId = localStorage.getItem('id');
    try {
      await this.auth.signOut();
      this.usersService.clearCurrentUser();
      this.firestoreService.updateDoc('users', userId!, {
        online: false,
      });
      await this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}

import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: Auth) {}

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}

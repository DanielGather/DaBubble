import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ModalComponent } from '../../../shared/modal/modal.component';
import { FormInputComponent } from '../../../shared/form-input/form-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { AuthenticationService } from '../../../../services/authentication.service';
import { AppUser } from '../../../../types/types';
import { FirestoreService } from '../../../../services/firestore.service';
import { Router } from '@angular/router';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    ModalComponent,
    FormInputComponent,
    ButtonComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;
  firestore = inject(FirestoreService);
  authService = inject(AuthenticationService);
  usersService = inject(UsersService);

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      privacyPolicy: [false, [Validators.requiredTrue]],
    });
  }

  /**
   * Button Click - Führt die register() funktion aus wenn die Form valid ist.
   */

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.register(
        this.signupForm.value.email,
        this.signupForm.value.password
      );
    } else {
      this.markFormGroupTouched(this.signupForm);
    }
  }

  /**
   * Führt signUp aus Auth aus und und danach die addUserToFirebase()
   */

  async register(email: string, password: string) {
    try {
      const userCredential = await this.auth.signUp(email, password);
      const user = userCredential.user;
      await this.addUserToFirebase(user);
      this.router.navigateByUrl('/choose-avatar');
    } catch (error) {
      console.log('signup error:', error);
    }
  }

  /**
   * Schickt den User in die firestore DB. Benutzt als Object argument (das letzte) direkt die funktion prepareUserObject() welche den User baut und returned.
   */

  async addUserToFirebase(user: any) {
    await this.firestore.setDoc(
      'users',
      user.uid,
      await this.prepareUserObject(user)
    );
  }

  /**
   * Fügt einem leeren User Object die daten: mail, first- und lastname hinzu und returned es. Ausserdem wird dieser user an usersService geschickt.
   */

  async prepareUserObject(user: AppUser) {
    const fullName = this.signupForm.value.fullName;
    const nameParts = fullName.split(' ');
    const userObject: AppUser = {
      avatarId: 0,
      email: user.email,
      firstName: nameParts[0] || '',
      lastName: nameParts.length > 1 ? nameParts.slice(1).join(' ') : '',
      online: true,
    };

    this.usersService.userInformation = userObject;
    return userObject;
  }

  getFullNameErrorMessage(): string {
    const fullNameControl = this.signupForm.get('fullName');
    if (fullNameControl?.touched) {
      if (fullNameControl.errors?.['required']) {
        return 'Name ist erforderlich';
      }
      if (fullNameControl.errors?.['minlength']) {
        return `Name muss mindestens ${fullNameControl.errors?.['minlength'].requiredLength} Zeichen haben`;
      }
    }
    return '';
  }

  getEmailErrorMessage(): string {
    const emailControl = this.signupForm.get('email');
    if (emailControl?.touched) {
      if (emailControl.errors?.['required']) {
        return 'Email ist erforderlich';
      }
      if (emailControl.errors?.['email']) {
        return 'Ungültiges Email-Format';
      }
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.signupForm.get('password');
    if (passwordControl?.touched) {
      if (passwordControl.errors?.['required']) {
        return 'Passwort ist erforderlich';
      }
      if (passwordControl.errors?.['minlength']) {
        return `Passwort muss mindestens ${passwordControl.errors?.['minlength'].requiredLength} Zeichen haben`;
      }
    }
    return '';
  }

  getPrivacyPolicyErrorMessage(): string {
    const privacyPolicyControl = this.signupForm.get('privacyPolicy');
    if (privacyPolicyControl?.touched) {
      if (
        privacyPolicyControl.errors?.['required'] ||
        privacyPolicyControl.errors?.['requiredTrue']
      ) {
        return 'Du musst der Datenschutzerklärung zustimmen';
      }
    }
    return '';
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}

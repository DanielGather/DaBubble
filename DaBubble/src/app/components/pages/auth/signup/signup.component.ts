import { Component, inject, OnInit } from '@angular/core';
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
import { UserCredential } from 'firebase/auth';
import { FirestoreService } from '../../../../services/firestore.service';

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
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  firestore = inject(FirestoreService);
  userObject: AppUser = {
    avatarId: 0,
    email: '',
    firstName: '',
    lastName: '',
    online: false,
    userId: '',
  };

  constructor(private fb: FormBuilder, private auth: AuthenticationService) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      privacyPolicy: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit(): void {}

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

  register(email: string, password: string) {
    this.auth.signUp(email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log('User registered:', user);
      this.addUserToFirebase(user);
    });
  }

  addUserToFirebase(user: any) {
    const fullName = this.signupForm.value.fullName;
    const nameParts = fullName.split(' ');

    this.userObject = {
      avatarId: 0,
      email: user.email,
      firstName: nameParts[0] || '',
      lastName: nameParts.length > 1 ? nameParts.slice(1).join(' ') : '',
      online: false,
      userId: user.uid,
    };

    this.firestore.addDoc('users', this.userObject);
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

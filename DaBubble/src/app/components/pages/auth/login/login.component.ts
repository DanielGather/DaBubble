import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInputComponent } from '../../../shared/form-input/form-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormInputComponent,
    ButtonComponent,
    ModalComponent,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  auth = inject(AuthenticationService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.login(this.loginForm.value.email, this.loginForm.value.password);
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  login(email: string, password: string) {
    this.auth
      .signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user.email;
        console.log('User logged in:', user, userCredential);
        this.router.navigateByUrl('/chat/private');
      })
      .catch((error) => {
        console.log('login error:', error);
      });
  }

  signInWithGoogle(): void {
    // sign in mit google logik
    console.log('Google Sign-In clicked');
  }

  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
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
    const passwordControl = this.loginForm.get('password');
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

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}

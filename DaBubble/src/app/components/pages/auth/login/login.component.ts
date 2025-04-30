import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInputComponent } from '../../../shared/form-input/form-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ModalComponent } from '../../../shared/modal/modal.component';

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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      console.log(this.loginForm.value.email);

      // Hier deine Login-Logik implementieren
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
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

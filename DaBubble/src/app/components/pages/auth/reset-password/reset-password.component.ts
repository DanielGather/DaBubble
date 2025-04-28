import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonComponent } from '../../../shared/button/button.component';
import { FormInputComponent } from '../../../shared/form-input/form-input.component';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    FormInputComponent,
    ModalComponent,
    RouterLink,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  emailSent: boolean = false;

  constructor(private fb: FormBuilder) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      console.log(this.resetForm.value);
      // Hier Logik für das Zurücksetzen des Passworts
      this.emailSent = true;
    } else {
      this.markFormGroupTouched(this.resetForm);
    }
  }

  getEmailErrorMessage(): string {
    const emailControl = this.resetForm.get('email');
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

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}

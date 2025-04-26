import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-reset-password',
  imports: [ButtonComponent, FormInputComponent, ModalComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {}

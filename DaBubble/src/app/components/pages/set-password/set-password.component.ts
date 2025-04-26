import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-set-password',
  imports: [ButtonComponent, FormInputComponent, ModalComponent],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
})
export class SetPasswordComponent {}

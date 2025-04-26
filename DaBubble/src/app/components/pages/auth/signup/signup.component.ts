import { Component } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { FormInputComponent } from '../../../shared/form-input/form-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-signup',
  imports: [ModalComponent, FormInputComponent, ButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {}

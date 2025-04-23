import { Component } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { FormInputComponent } from '../shared/form-input/form-input.component';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-login',
  imports: [ModalComponent, FormInputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}

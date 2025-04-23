import { Component } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { FormInputComponent } from '../shared/form-input/form-input.component';

@Component({
  selector: 'app-login',
  imports: [ModalComponent, FormInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}

import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-auth-layout',
  imports: [ModalComponent, LoginComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}

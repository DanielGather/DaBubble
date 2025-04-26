import { Component } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { FormInputComponent } from '../../../shared/form-input/form-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { RouterLink } from '@angular/router';
import { DaBubbleLogoComponent } from '../../../shared/da-bubble-logo/da-bubble-logo.component';
import { LegalLinksComponent } from '../shared/legal-links/legal-links.component';

@Component({
  selector: 'app-login',
  imports: [
    ModalComponent,
    FormInputComponent,
    ButtonComponent,
    RouterLink,
    DaBubbleLogoComponent,
    LegalLinksComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}

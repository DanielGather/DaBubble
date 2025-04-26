import { Component } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { FormInputComponent } from '../../../shared/form-input/form-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { RouterLink } from '@angular/router';
import { DaBubbleLogoComponent } from '../../../shared/da-bubble-logo/da-bubble-logo.component';
import { LegalNoticeComponent } from '../../legals/legal-notice/legal-notice.component';

@Component({
  selector: 'app-signup',
  imports: [ModalComponent, FormInputComponent, ButtonComponent, RouterLink, DaBubbleLogoComponent, LegalNoticeComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {}

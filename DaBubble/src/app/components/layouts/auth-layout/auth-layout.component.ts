import { Component } from '@angular/core';
import { LegalLinksComponent } from '../../pages/auth/shared/legal-links/legal-links.component';
import { RouterOutlet } from '@angular/router';
import { DaBubbleLogoComponent } from '../../shared/da-bubble-logo/da-bubble-logo.component';

@Component({
  selector: 'app-auth-layout',
  imports: [LegalLinksComponent, RouterOutlet, DaBubbleLogoComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}

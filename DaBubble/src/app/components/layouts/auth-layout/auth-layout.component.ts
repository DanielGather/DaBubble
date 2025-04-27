import { Component } from '@angular/core';
import { LegalLinksComponent } from '../../pages/auth/shared/legal-links/legal-links.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [
LegalLinksComponent, RouterOutlet
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}

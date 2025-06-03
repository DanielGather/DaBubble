import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DaBubbleLogoComponent } from '../../shared/da-bubble-logo/da-bubble-logo.component';

@Component({
  selector: 'app-legals-layout',
  imports: [CommonModule, RouterLink, RouterOutlet, DaBubbleLogoComponent],
  templateUrl: './legals-layout.component.html',
  styleUrl: './legals-layout.component.scss'
})
export class LegalsLayoutComponent {

}

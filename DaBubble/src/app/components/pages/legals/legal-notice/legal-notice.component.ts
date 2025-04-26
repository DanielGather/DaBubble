import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DaBubbleLogoComponent } from '../../../shared/da-bubble-logo/da-bubble-logo.component';

@Component({
  selector: 'app-legal-notice',
  imports: [RouterLink, DaBubbleLogoComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-legals-layout',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './legals-layout.component.html',
  styleUrl: './legals-layout.component.scss'
})
export class LegalsLayoutComponent {

}

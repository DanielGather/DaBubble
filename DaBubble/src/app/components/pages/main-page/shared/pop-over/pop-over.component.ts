import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pop-over',
  imports: [CommonModule],
  templateUrl: './pop-over.component.html',
  styleUrl: './pop-over.component.scss'
})
export class PopOverComponent {
  @Input() addClass:Array<string> = [];
  @Input() stopPropagation:boolean = false;
}

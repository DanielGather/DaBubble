import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() bgColor: string = 'bg-white';
  @Input() rounded: string = 'rounded-3xl';
  @Input() cornerOverride: string = '';
  @Input() gap: string = 'gap-7';
  @Input() w: string = 'w-[800px]';
}

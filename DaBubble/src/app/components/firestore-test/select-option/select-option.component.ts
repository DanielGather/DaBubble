import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-select-option',
  imports: [CommonModule],
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.scss'
})
export class SelectOptionComponent {
  @Input() docTitle: string = '';
  @Output() docTitleOutput = new EventEmitter<string>()
  selectDoc() {
    this.docTitleOutput.emit(this.docTitle);
  }
}

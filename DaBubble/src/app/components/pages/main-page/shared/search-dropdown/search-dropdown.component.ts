import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  input,
  Output,
} from '@angular/core';
import { UserElementComponent } from '../../../../shared/user-element/user-element.component';

@Component({
  selector: 'app-search-dropdown',
  imports: [UserElementComponent],
  templateUrl: './search-dropdown.component.html',
  styleUrl: './search-dropdown.component.scss',
})
export class SearchDropdownComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.visible && !this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}

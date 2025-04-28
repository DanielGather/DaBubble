import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  constructor(private renderer: Renderer2) {}
  @Input() type: 'blueButton' | 'greyButton' | 'transparentButton' =
    'blueButton';
  @Input() class: string = '';
  @Input() disabled: boolean = false;

  @ViewChild('myButton') buttonElement!: ElementRef;

  buttonConfig = {
    blueButton: {
      class:
        'bg-bg-button-blue text-white rounded-standard h-12 w-fit pl-4 pr-4',
    },
    greyButton: {
      class:
        'bg-bg-button-grey text-white rounded-standard h-12 w-fit pl-4 pr-4',
    },
    transparentButton: {
      class:
        'bg-bg-button-transparent text-white rounded-standard h-12 w-fit pl-4 pr-4',
    },
  };

  ngAfterViewInit() {
    this.addClassToSpan();
    this.addClassToImg();
  }

  /**
   * Adds the CSS class 'font-bold' to the native button element,
   * but only if the button element contains a child `<span>` element.
   *
   * This method uses Renderer2 to add the class safely and
   * platform-independently.
   */
  addClassToSpan() {
    const hasSpan =
      this.buttonElement.nativeElement.querySelector('span') !== null;
    const elementRef = this.buttonElement.nativeElement;
    if (hasSpan) {
      this.renderer.addClass(elementRef, 'font-bold');
    }
  }

  /**
   * Adds the CSS classes 'flex', 'gap-2', and 'items-center' to the native button element,
   * but only if the button element contains a child `<svg>` element.
   *
   * This method uses Renderer2 to add the classes safely and
   * platform-independently.
   */
  addClassToImg() {
    const hasImage =
      this.buttonElement.nativeElement.querySelector('svg') !== null;
    const elementRef = this.buttonElement.nativeElement;
    if (hasImage) {
      this.renderer.addClass(elementRef, 'flex');
      this.renderer.addClass(elementRef, 'gap-2');
      this.renderer.addClass(elementRef, 'items-center');
    }
  }

  /**
   * Retrieves the CSS class for the button based on the current `type`.
   *
   * The method accesses the `buttonConfig` property to find the class
   * for the specific `type`. If no class exists for the current `type`,
   * the class of the `blueButton` configuration is returned as the default.
   */
  get buttonClass() {
    return (
      this.buttonConfig[this.type]?.class || this.buttonConfig.blueButton.class
    );
  }
}

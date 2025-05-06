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
        'bg-bg-button-transparent text-[#444df2] border-2 border-[#444df2] rounded-standard h-12 w-fit pl-4 pr-4',
    },
  };

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

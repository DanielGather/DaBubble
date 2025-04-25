import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type: 'blueButton' | 'greyButton' | 'transparentButton' =
    'blueButton';
  @Input() class: string = '';
  @Input() name: string = '';

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

  get buttonClass() {
    return (
      this.buttonConfig[this.type]?.class || this.buttonConfig.blueButton.class
    );
  }
}

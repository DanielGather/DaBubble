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
      class: 'bg-bg-button-blue text-white rounded-standard h-12 w-36',
      name: 'Erstellen',
    },
    greyButton: {
      class: 'bg-bg-button-grey text-white rounded-standard h-12 w-36',
      name: 'Passwort ändern',
    },
    transparentButton: {
      class: 'bg-bg-button-transparent text-white rounded-standard h-12 w-36',
      name: 'Speichern',
    },
  };

  get buttonClass() {
    return (
      this.buttonConfig[this.type]?.class || this.buttonConfig.blueButton.class
    );
  }

  get buttonName() {
    return (
      this.buttonConfig[this.type]?.name || this.buttonConfig.blueButton.name
    );
  }
}

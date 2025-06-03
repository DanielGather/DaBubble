import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements ControlValueAccessor {
  imgSources = [
    { email: 'img/form_mail.svg' },
    { password: 'img/form_password.svg' },
    { user: 'img/form_user.svg' },
  ];

  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() imgSrc?: string;
  @Input() errorMessage: string = '';

  value: any = '';
  disabled: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  get iconSrc(): string {
    if (this.imgSrc) return this.imgSrc;
    if (this.type === 'email') return 'img/form_mail.svg';
    if (this.type === 'password') return 'img/form_password.svg';
    return 'img/form_user.svg';
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: any) {
    const value = event.target.value;
    this.value = value;
    this.onChange(value);
  }
}

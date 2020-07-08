import { AbstractControl } from '@angular/forms';

export function ValidatePassword(control: AbstractControl) {
    
  if (control.value.length < 8) {
    return { validUrl: true };
  }
  return null;
}
import { FormGroup, ValidatorFn } from '@angular/forms';

export function inputMatch(mustMatch: string): ValidatorFn {
    return (group: FormGroup): {[key: string]: any} => {
      if (group.controls['title'].value !== mustMatch) {
        return {
          inputMatch: true
        };
      }
    }
  }
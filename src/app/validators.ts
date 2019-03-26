import { AbstractControl, ValidatorFn } from '@angular/forms';

export class MyValidators {
  static AmountRangeValidator(max: number, min: number): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } => {
      if (Number(currentControl.value) < min || Number(currentControl.value) > max) {
        return {
          rangeErrorMessage: true
        };
      }
      return null;
    }
  }
}
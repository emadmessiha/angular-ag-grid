import { AbstractControl, ValidatorFn } from '@angular/forms';

export class MyValidators {
  static AmountRangeValidator(max: number, min: number): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } => {
      if (currentControl.value < min || currentControl.value > max) {
        let temp = {};
        temp['rangeErrorMessage'] = true;
        return temp;
      }
      return null;
    }
  }
}
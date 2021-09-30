import { ValidatorFn } from '@angular/forms';

export class CustomValidators {
  public static equalTo(operation: () => unknown): ValidatorFn {
    return (control) => {
      const operationValue = operation();
      if (control.value != operationValue) {
        return { notEqualTo: operationValue };
      }

      return null;
    };
  }

  public static equalToThisContol(name: string): ValidatorFn {
    return (control) => {
      const referenceControl = control.parent?.get(name);

      if (referenceControl && referenceControl.value != control.value) {
        return {
          notEqualTo: name,
        };
      }

      return null;
    };
  }
}

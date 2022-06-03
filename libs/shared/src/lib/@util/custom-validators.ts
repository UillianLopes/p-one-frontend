import { UntypedFormArray, UntypedFormGroup, ValidatorFn } from '@angular/forms';

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

  public static requireToBeObject: ValidatorFn = (control) =>
    control.value && typeof control.value === 'object'
      ? null
      : { requireToBeObject: true };

  public static whenParent(
    validator: ValidatorFn,
    condition: (parent: UntypedFormGroup | UntypedFormArray | null) => boolean
  ): ValidatorFn {
    return (control) => {
      if (!condition(control.parent)) {
        return null;
      }

      return validator(control);
    };
  }
}

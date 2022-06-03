import { AbstractControl, UntypedFormArray, UntypedFormGroup } from '@angular/forms';

export function updateValueAndValidityMarkingControlsAreDirty(
  form: AbstractControl | null
): void {
  if (!form) {
    return;
  }

  if (form instanceof UntypedFormGroup) {
    for (const controlKey of Object.keys(form.controls)) {
      updateValueAndValidityMarkingControlsAreDirty(form.get(controlKey));
    }
    return;
  }

  if (form instanceof UntypedFormArray) {
    for (const control of form.controls) {
      updateValueAndValidityMarkingControlsAreDirty(control);
    }
    return;
  }

  form.updateValueAndValidity();
  form.markAsDirty();
}

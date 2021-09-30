import { DynamicFormElement } from './@types/dynamic-form-element.config';
import { DynamicFormField } from './@types/dynamic-form-field.config';
import { DynamicFormGroup } from './@types/dynamic-form-group.config';
import { DynamicFormRow } from './@types/dynamic-form-row.config';

export abstract class DynamicFormElementBase {
  formElementAsField(element: DynamicFormElement): DynamicFormField | null {
    return element instanceof DynamicFormField ? element : null;
  }

  formElementAsRow(element: DynamicFormElement): DynamicFormRow | null {
    return element instanceof DynamicFormRow ? element : null;
  }

  formElementAsGroup(element: DynamicFormElement): DynamicFormGroup | null {
    return element instanceof DynamicFormGroup ? element : null;
  }
}

import { DynamicFormElement } from './dynamic-form-element.config';

export abstract class DynamicFormStructure extends DynamicFormElement {
  elements!: DynamicFormElement[];

  constructor(args?: Partial<DynamicFormStructure>) {
    super();

    if (args) {
      Object.assign(this, args);
    }
  }
}

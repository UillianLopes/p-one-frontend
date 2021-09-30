import { DynamicFormElement } from './dynamic-form-element.config';

export class DynamicForm {
  elemens!: DynamicFormElement[];

  constructor(args?: DynamicForm) {
    if (args) {
      Object.assign(this, args);
    }
  }
}

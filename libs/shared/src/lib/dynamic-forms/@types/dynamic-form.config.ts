import { DynamicFormElement } from './dynamic-form-element.config';

export class DynamicForm {
  elemens!: DynamicFormElement[];

  constructor(args?: Partial<DynamicForm>) {
    if (args) {
      Object.assign(this, args);
    }
  }
}

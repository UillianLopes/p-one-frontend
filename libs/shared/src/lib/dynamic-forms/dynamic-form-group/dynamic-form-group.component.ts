import { Component, EventEmitter, Input, OnInit, Optional, Output, SkipSelf } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DynamicFormElement } from '../@types/dynamic-form-element.config';
import { DynamicFormField } from '../@types/dynamic-form-field.config';
import { DynamicFormGroup } from '../@types/dynamic-form-group.config';
import { DynamicFormRow } from '../@types/dynamic-form-row.config';
import { DynamicFormElementBase } from '../dynamic-form-element.base';

@Component({
  selector: 'p-one-dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.scss'],
})
export class DynamicFormGroupComponent
  extends DynamicFormElementBase
  implements OnInit
{
  @Input()
  formGroup!: FormGroup;

  @Input()
  config!: DynamicFormGroup;

  @Output()
  formReady$ = new EventEmitter<boolean>();

  @Input() set data(value: any) {
    if (this.formGroup) {
      this.formGroup.patchValue(value);
    }
  }

  constructor(
    @SkipSelf()
    @Optional()
    private readonly _formGroupComponent: DynamicFormGroupComponent
  ) {
    super();
  }

  ngOnInit(): void {
    const parentFormGroup = this._formGroupComponent?.formGroup;

    if (!this.formGroup && parentFormGroup && this.config.name) {
      if (!parentFormGroup.contains(this.config.name)) {
        throw new Error('Invalid form group definition');
      }

      this.formGroup = parentFormGroup.get(this.config.name) as FormGroup;
    }

    this._addElementsToFormGroup(this.config.elements);

    this.formReady$.emit(true);
  }

  private _addElementsToFormGroup(elements: DynamicFormElement[]) {
    for (const element of elements) {
      if (
        element instanceof DynamicFormField &&
        !this.formGroup.contains(element.name)
      ) {
        this.formGroup.addControl(
          element.name,
          new FormControl(element.initialValue, element.validators)
        );
        continue;
      }

      if (element instanceof DynamicFormRow) {
        this._addElementsToFormGroup(element.elements);
        continue;
      }

      if (
        element instanceof DynamicFormGroup &&
        element.name &&
        !this.formGroup.contains(element.name)
      ) {
        this.formGroup.addControl(
          element.name,
          new FormGroup({}, element.validators)
        );
        continue;
      }
    }
  }
}

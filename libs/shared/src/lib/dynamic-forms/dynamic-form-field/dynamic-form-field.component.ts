import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl } from '@angular/forms';

import {
  DyanamicTextFormField,
  DynamicFormField,
} from '../@types/dynamic-form-field.config';
import { DynamicFormGroupComponent } from '../dynamic-form-group/dynamic-form-group.component';

@Component({
  selector: 'p-one-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
})
export class DynamicFormFieldComponent implements OnInit {
  @Input()
  config!: DynamicFormField;

  formControl?: UntypedFormControl;
  formArray?: UntypedFormArray;

  constructor(private readonly _dynamicFormGroup: DynamicFormGroupComponent) {}

  ngOnInit(): void {
    this.formControl = this._controlAsFormControl();
  }

  dynamicFormFieldAsText(): DyanamicTextFormField | undefined {
    return this.config instanceof DyanamicTextFormField
      ? this.config
      : undefined;
  }

  private _controlAsFormControl(): UntypedFormControl | undefined {
    return this._dynamicFormGroup.formGroup?.get(
      this.config.name
    ) as UntypedFormControl;
  }
}

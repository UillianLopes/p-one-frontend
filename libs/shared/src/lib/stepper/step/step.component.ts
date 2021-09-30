import { ChangeDetectionStrategy, Component, Input, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormGroupName } from '@angular/forms';

@Component({
  selector: 'p-one-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent {
  @Input()
  header?: string;

  @ViewChild('headerTemplate', { static: true })
  haderTemplate!: TemplateRef<any>;

  @ViewChild('contentTemplate', { static: true })
  contentTemplate!: TemplateRef<any>;

  @Input()
  identifier?: string;

  get formGroup(): FormGroup | undefined {
    return this._formControlName?.control ?? this._formGroupDirective?.form;
  }

  constructor(
    @Optional() private readonly _formGroupDirective?: FormGroupDirective,
    @Optional() private readonly _formControlName?: FormGroupName
  ) {}

  validate(): boolean {
    if (!this.formGroup || this.formGroup.valid) {
      return true;
    }

    for (const key of Object.keys(this.formGroup.controls)) {
      this.formGroup.get(key)?.updateValueAndValidity();
    }

    return false;
  }
}

import { ChangeDetectionStrategy, Component, Input, Optional, TemplateRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  FormGroupName,
} from '@angular/forms';
import { v4 } from 'uuid';

import { StepperStateService } from '../stepper-state.service';

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

  @Input()
  public isInvalid?: boolean;

  get control(): AbstractControl | undefined {
    return (
      this._formControlName?.control ??
      this._formControlDirective?.control ??
      this._formGroupName?.control ??
      this._formGroupDirective?.form
    );
  }

  readonly uinqueId = v4();

  constructor(
    private readonly _stepperStateService: StepperStateService,
    @Optional() private readonly _formGroupDirective?: FormGroupDirective,
    @Optional() private readonly _formGroupName?: FormGroupName,
    @Optional() private readonly _formControlDirective?: FormControlDirective,
    @Optional() private readonly _formControlName?: FormControlName
  ) {}

  next() {
    if (!this._validate()) {
      return;
    }

    this._stepperStateService.next();
  }

  previous() {
    this._stepperStateService.previous();
  }

  private _validate(): boolean {
    if (this.isInvalid) {
      return false;
    }

    if (!this.control || this.control.valid) {
      return true;
    }

    if (this.control instanceof FormGroup) {
      for (const key of Object.keys(this.control.controls)) {
        this.control.get(key)?.updateValueAndValidity();
      }
    } else if (this.control instanceof FormControl) {
      this.control.updateValueAndValidity();
    }

    return false;
  }
}

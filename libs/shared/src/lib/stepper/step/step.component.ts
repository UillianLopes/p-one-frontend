import { ChangeDetectionStrategy, Component, Input, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormControlStatus,
  FormGroup,
  FormGroupDirective,
  FormGroupName,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { v4 } from 'uuid';

import { DestroyableMixin } from '../../@mixins';
import { StepperStore } from '../stepper.state';

@Component({
  selector: 'p-one-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent extends DestroyableMixin() implements OnInit {
  @Input()
  public identifier = v4();

  @ViewChild('headerTemplate', { static: true })
  public haderTemplate!: TemplateRef<any>;

  @ViewChild('contentTemplate', { static: true })
  public contentTemplate!: TemplateRef<any>;

  @Input()
  public set isInvalid(isInvalid: boolean) {}

  @Input()
  public header?: string;

  public get control(): AbstractControl | undefined {
    return (
      this._formControlName?.control ??
      this._formControlDirective?.control ??
      this._formGroupName?.control ??
      this._formGroupDirective?.form
    );
  }

  public readonly status$ = new Subject<FormControlStatus>();

  constructor(
    private readonly _stepperStore: StepperStore,
    @Optional() private readonly _formGroupDirective?: FormGroupDirective,
    @Optional() private readonly _formGroupName?: FormGroupName,
    @Optional() private readonly _formControlDirective?: FormControlDirective,
    @Optional() private readonly _formControlName?: FormControlName
  ) {
    super();
  }

  public ngOnInit(): void {
    if (!this.control) {
      return;
    }

    this.control.statusChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((status) => this.status$.next(status));
  }

  public next(): void {
    this._stepperStore.next();
    this._validate();
  }

  public previous(): void {
    this._stepperStore.previous();
    this._validate();
  }

  private _validate(): boolean {
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

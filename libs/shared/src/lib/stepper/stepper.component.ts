import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

import { DestroyableMixin } from '../@mixins';
import { StepComponent } from './step/step.component';
import { StepperStore } from './stepper.state';

@Component({
  selector: 'p-one-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StepperStore],
})
export class StepperComponent
  extends DestroyableMixin()
  implements AfterContentInit
{
  @Input()
  public set isCompleted(value: boolean) {
    this._stepperStore.setIsCompleted(value);
  }

  @Input()
  public set validate(validate: boolean) {
    this._stepperStore.setValidate(validate);
  }

  @ContentChildren(StepComponent, { descendants: true })
  public steps!: QueryList<StepComponent>;

  public steps$?: Observable<StepComponent[]>;
  public isValid$?: Observable<boolean>;

  @Output()
  public readonly selectedStep$ = this._stepperStore.selectedStep$;

  constructor(private readonly _stepperStore: StepperStore) {
    super();
  }

  public setSelectedStep(stepIndex: number): void {
    this._stepperStore.setSelectedStep(stepIndex);
  }

  public setStepStatus(index: number, status: FormControlStatus): void {
    this._stepperStore.setStepStatus({
      index,
      status,
    });
  }

  public ngAfterContentInit(): void {
    this.steps$ = this.steps.changes.pipe(
      startWith(this.steps?.map((step) => step) ?? []),
      map((steps: StepComponent[]) => steps),
      tap((steps) => this._stepperStore.setStepAmmount(steps.length))
    );
  }

  public next(): void {
    this._stepperStore.next();
  }

  public previous(): void {
    this._stepperStore.previous();
  }
}

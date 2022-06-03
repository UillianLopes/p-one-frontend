import { Component, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { EEntryRecurrence, EEntryValueDistribuition } from '@p-one/financial';
import { DestroyableMixin, StepComponent } from '@p-one/shared';
import { combineLatest } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { EntryCreateFacade } from '../../+state/entry-create.facade';

@Component({
  selector: 'p-one-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
})
export class SecondStepComponent extends DestroyableMixin() implements OnInit {
  readonly EntryRecurrence = EEntryRecurrence;
  readonly EntryValueDistribuitioin = EEntryValueDistribuition;
  private readonly now = new Date();
  readonly form = this._formBuilder.group({
    value: [0.01, [Validators.required, Validators.min(0.01)]],
    dueDate: [this.now, [Validators.required]],
    recurrence: [EEntryRecurrence.OneTime, [Validators.required]],
    day: [1, Validators.required],
    intervalInDays: [30, [Validators.min(1), Validators.max(31)]],
    times: [1, Validators.required],
    valueDistribuition: [EEntryValueDistribuition.Repeat, Validators.required],
    barCode: [],
  });

  public readonly recurrence$ = this._facade.recurrence$;
  public readonly isLoading$ = this._facade.isLoading$;
  public readonly isRecurrenceNotOneTime$ = this.recurrence$.pipe(
    map((recurrence) => ![EEntryRecurrence.OneTime].includes(recurrence))
  );

  public readonly isRecurrenceOneTime$ = this.isRecurrenceNotOneTime$.pipe(
    map((isRecurrenceNotOneTime) => !isRecurrenceNotOneTime)
  );

  public readonly recurrences$ = this._facade.recurrences$;
  public readonly isRecurrencesDisplayed$ = combineLatest([
    this.isRecurrenceNotOneTime$,
    this.recurrences$,
  ]).pipe(
    map(([isRecurrenceNotOneTime, recurrences]) => {
      return isRecurrenceNotOneTime && recurrences?.length > 0;
    })
  );

  public readonly isBuildingRecurrences$ = this._facade.isBuildingRecurrences$;
  public readonly isSecondStepInvalid$ = this._facade.isSecondStepInvalid$;

  public readonly isCreateButtonDisabled$ = combineLatest([
    this.isSecondStepInvalid$,
    this.isBuildingRecurrences$,
    this.isLoading$,
  ]).pipe(
    map(
      ([isSecondStepInvalid, isBuildingRecurrences, isLoading]) =>
        isLoading || isSecondStepInvalid || isBuildingRecurrences
    )
  );

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _facade: EntryCreateFacade,
    @Optional() private readonly _step: StepComponent
  ) {
    super();
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.form.value))
      .subscribe((value) => {
        this._facade.setSecondStepForm(value);
      });
  }

  buildRecurrences(): void {
    this._facade.buildRecurrences();
  }

  createEntry(): void {
    this._facade.createEntry();
  }

  next() {
    this._facade.buildRecurrences();
  }
}

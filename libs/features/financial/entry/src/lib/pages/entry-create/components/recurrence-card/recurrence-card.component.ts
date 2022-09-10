import { WeekDay } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { EEntryRecurrence } from '@p-one/domain/financial';
import { DestroyableMixin } from '@p-one/shared';
import { map, startWith, takeUntil } from 'rxjs';

import { EntryCreateFacade } from '../../+state/entry-create.facade';
import { EntryCreateFormKeys } from '../../@types/entry-create-form-keys';

@Component({
  selector: 'p-one-recurrence-card',
  templateUrl: './recurrence-card.component.html',
  styleUrls: ['./recurrence-card.component.scss'],
})
export class RecurrenceCardComponent
  extends DestroyableMixin()
  implements OnInit, OnDestroy
{
  readonly EntryRecurrence = EEntryRecurrence;
  readonly WeekDay = WeekDay;

  readonly now = new Date();
  readonly form = this._formBuilder.group({
    begin: [new Date(), [Validators.required]],
    end: [],
    recurrence: [
      EEntryRecurrence.EverySpecificDayOfMonth,
      [Validators.required],
    ],
  });

  readonly dayOfMonthControl = this._formBuilder.control(1, [
    Validators.required,
    Validators.min(1),
    Validators.max(31),
  ]);

  readonly dayOfWeekControl = this._formBuilder.control(WeekDay.Sunday, [
    Validators.required,
  ]);

  readonly isGeneralInfoFormValid$ = this._facade.formStatus$.pipe(
    map((status) => status[EntryCreateFormKeys.GeneralInfo] === 'VALID')
  );

  readonly recurrence$ = this._facade.recurrenceFormRecurrence$;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _facade: EntryCreateFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.form.value))
      .subscribe((value) => this._facade.pathRecurrenceForm(value));

    this.dayOfMonthControl.valueChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.dayOfMonthControl.value))
      .subscribe((dayOfMonth) =>
        this._facade.pathRecurrenceForm({ dayOfMonth })
      );

    this.dayOfWeekControl.valueChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.dayOfWeekControl.value))
      .subscribe((dayOfWeek) => this._facade.pathRecurrenceForm({ dayOfWeek }));

    this.form.statusChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.form.status))
      .subscribe((status) => {
        this._facade.patchFormStatus(EntryCreateFormKeys.Recurrence, status);
      });
  }

  createRecurrentEntry(): void {
    this._facade.createRecurrentEntry();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._facade.resetRecurrenceForm();
  }
}

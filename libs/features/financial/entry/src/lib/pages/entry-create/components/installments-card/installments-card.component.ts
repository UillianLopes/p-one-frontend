import { WeekDay } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { EEntryRecurrence, EEntryValueDistribuition, InstallmentModel } from '@p-one/domain/financial';
import { DestroyableMixin } from '@p-one/shared';
import { combineLatest, map, startWith, takeUntil } from 'rxjs';

import { EntryCreateFacade } from '../../+state/entry-create.facade';
import { EntryCreateFormKeys } from '../../@types/entry-create-form-keys';

@Component({
  selector: 'p-one-installments-card',
  templateUrl: './installments-card.component.html',
  styleUrls: ['./installments-card.component.scss'],
})
export class InstallmentsCardComponent
  extends DestroyableMixin()
  implements OnInit, OnDestroy
{
  private readonly now = new Date();

  readonly WeekDay = WeekDay;
  readonly EntryRecurrence = EEntryRecurrence;
  readonly EntryValueDistribuitioin = EEntryValueDistribuition;
  readonly form = this._formBuilder.group({
    recurrence: [
      EEntryRecurrence.EverySpecificDayOfMonth,
      [Validators.required],
    ],
    installments: [
      2,
      [Validators.required, Validators.min(2), Validators.max(200)],
    ],
    valueDistribuition: [EEntryValueDistribuition.Repeat, Validators.required],
    begin: [
      { year: this.now.getFullYear(), month: this.now.getMonth() + 1 },
      Validators.required,
    ],
  });

  readonly dayControl = this._formBuilder.control(1, [
    Validators.min(1),
    Validators.max(31),
  ]);

  readonly dayOfWeekControl = this._formBuilder.control(WeekDay.Monday, [
    Validators.required,
  ]);

  readonly isFormValid$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((status) => status === 'VALID')
  );

  readonly isDayValid$ = this.dayControl.statusChanges.pipe(
    startWith(this.dayControl.status),
    map((status) => status === 'VALID')
  );

  readonly isDayOfWeekValid$ = this.dayOfWeekControl.statusChanges.pipe(
    startWith(this.dayOfWeekControl.status),
    map((status) => status === 'VALID')
  );

  readonly isLoading$ = this._facade.isLoading$;
  readonly isBuildingRecurrences$ = this._facade.isBuildingRecurrences$;
  readonly generalInfoFormCurrency$ = this._facade.generalInfoFormCurrencySelector$;
  readonly generalInfoFormValue$ = this._facade.generalInfoFormValue$;
  readonly installmentsFromRecurrence$ = this._facade.installmentsFromRecurrence$;
  readonly installments$ = this._facade.installments$;
  readonly isGenerateInstallmentsDisabled$ = combineLatest([
    this.isFormValid$,
    this.isDayValid$,
    this.isDayOfWeekValid$,
    this.installmentsFromRecurrence$,
    this.generalInfoFormValue$,
    this.installments$,
    this.isBuildingRecurrences$,
    this.isLoading$,
  ]).pipe(
    map(
      ([
        isFormValid,
        isDayValid,
        isDayOfWeekValid,
        recurrence,
        value,
        installments,
        isBuildingRecurrences,
        isLoading,
      ]) => {
        let flag: boolean = isFormValid;

        switch (recurrence) {
          case EEntryRecurrence.EverySpecificDayOfMonth:
            flag = flag && isDayValid;
            break;

          case EEntryRecurrence.EveryWeek:
            flag = flag && isDayOfWeekValid;
            break;
        }

        return (
          !flag ||
          !value ||
          (installments && installments.length > 0) ||
          isBuildingRecurrences ||
          isLoading
        );
      }
    )
  );

  readonly isGeneralInfoFormValid$ = this._facade.formStatus$.pipe(
    map((status) => status[EntryCreateFormKeys.GeneralInfo] === 'VALID')
  );

  readonly isCreateButtonDisabled$ = combineLatest([
    this.isGeneralInfoFormValid$,
    this.installments$,
    this.isBuildingRecurrences$,
    this.isLoading$,
  ]).pipe(
    map(
      ([
        isGeneralInfoFormValid,
        installments,
        isBuildingRecurrences,
        isLoading,
      ]) =>
        !isGeneralInfoFormValid ||
        !installments ||
        installments.length === 0 ||
        isLoading ||
        isBuildingRecurrences
    )
  );

  readonly trackById = (_: number, item: InstallmentModel) => item.index;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _facade: EntryCreateFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.form.value))
      .subscribe((value) => {
        this._facade.pathInstallmentsForm(value);
      });

    this.dayOfWeekControl.valueChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.dayOfWeekControl.value))
      .subscribe((dayOfWeek) => {
        this._facade.pathInstallmentsForm({
          dayOfWeek,
        });
      });

    this.dayControl.valueChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.dayControl.value))
      .subscribe((day) => {
        this._facade.pathInstallmentsForm({
          day,
        });
      });

    this.form.statusChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.form.status))
      .subscribe((status) => {
        this._facade.patchFormStatus(EntryCreateFormKeys.Installments, status);
      });
  }

  buildInstallments(): void {
    this._facade.buildInstallments();
  }

  createInstallmentEntries(): void {
    this._facade.createInstallmentEntries();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._facade.resetInstallmentsForm();
  }
}

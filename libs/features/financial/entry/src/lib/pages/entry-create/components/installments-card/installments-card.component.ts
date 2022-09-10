import { WeekDay } from '@angular/common';
import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { EEntryRecurrence, EEntryValueDistribuition, InstallmentModel } from '@p-one/domain/financial';
import { DestroyableMixin, StepComponent } from '@p-one/shared';
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
  readonly WeekDay = WeekDay;
  readonly EntryRecurrence = EEntryRecurrence;
  readonly EntryValueDistribuitioin = EEntryValueDistribuition;

  private readonly now = new Date();

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

  public readonly isLoading$ = this._facade.isLoading$;
  public readonly isBuildingRecurrences$ = this._facade.isBuildingRecurrences$;
  public readonly generalInfoFormCurrency$ = this._facade.generalInfoFormCurrencySelector$;
  public readonly generalInfoFormValue$ = this._facade.generalInfoFormValue$;
  public readonly installmentsFromRecurrence$ = this._facade.installmentsFromRecurrence$;
  public readonly installments$ = this._facade.installments$;
  public readonly isGenerateInstallmentsDisabled$ = combineLatest([
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
        let flag = isFormValid;

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

  public readonly isGeneralInfoFormValid$ = this._facade.formStatus$.pipe(
    map((status) => status[EntryCreateFormKeys.GeneralInfo] === 'VALID')
  );

  public readonly isCreateButtonDisabled$ = combineLatest([
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

  public readonly trackById = (_: number, item: InstallmentModel) => item.index;

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

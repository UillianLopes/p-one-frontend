import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EntryRecurrence, EntryValueDistribuition } from '@p-one/core';
import { DestroyableMixin } from '@p-one/shared';
import { combineLatest } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { EntryCreateFacade } from '../../+state/entry-create.facade';

@Component({
  selector: 'p-one-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
})
export class SecondStepComponent extends DestroyableMixin() implements OnInit {
  readonly EntryRecurrence = EntryRecurrence;
  readonly EntryValueDistribuitioin = EntryValueDistribuition;
  readonly form = this._formBuilder.group({
    value: [0.01, [Validators.required, Validators.min(0.01)]],
    dueDate: [null, [Validators.required]],
    recurrence: [EntryRecurrence.OneTime, [Validators.required]],
    day: [1, Validators.required],
    intervalInDays: [30, [Validators.min(1), Validators.max(31)]],
    times: [1, Validators.required],
    valueDistribuition: [EntryValueDistribuition.Repeat, Validators.required],
  });

  public readonly recurrence$ = this._entryCreateFacade.recurrence$;
  public readonly isRecurrenceNotOneTime$ = this.recurrence$.pipe(
    map((recurrence) => ![EntryRecurrence.OneTime].includes(recurrence))
  );

  public readonly recurrences$ = this._entryCreateFacade.recurrences$;
  public readonly isRecurrencesDisplayed$ = combineLatest([
    this.isRecurrenceNotOneTime$,
    this.recurrences$,
  ]).pipe(
    map(([isRecurrenceNotOneTime, recurrences]) => {
      return isRecurrenceNotOneTime && recurrences?.length > 0;
    })
  );
  
  public readonly isSecondStepInvalid$ = this._entryCreateFacade.isSecondStepInvalid$;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _entryCreateFacade: EntryCreateFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.form.value))
      .subscribe((value) => {
        this._entryCreateFacade.setSecondStepForm(value);
      });
  }

  buildRecurrences(): void {
    this._entryCreateFacade.buildRecurrences();
  }
}

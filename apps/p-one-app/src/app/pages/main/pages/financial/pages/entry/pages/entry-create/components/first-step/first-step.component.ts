import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EntryType } from '@p-one/core';
import { DestroyableMixin } from '@p-one/shared';
import { filter, startWith, takeUntil } from 'rxjs/operators';

import { EntryCreateFacade } from '../../+state/entry-create.facade';

@Component({
  selector: 'p-one-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
})
export class FirstStepComponent extends DestroyableMixin() implements OnInit {
  readonly EntryType = EntryType;
  readonly form = this._formBuilder.group({
    title: [null, Validators.required],
    type: [EntryType.Credit, [Validators.required]],
    category: [null, [Validators.required]],
    subCategory: [null, [Validators.required]],
  });

  public readonly categories$ = this._facade.filtredCategories$;
  public readonly subCategories$ = this._facade.filtredSubCategories$;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _facade: EntryCreateFacade
  ) {
    super();
  }

  displayFn = (obj: any) => obj.name;

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.form.value))
      .subscribe((value) => {
        this._facade.setFirstStepForm(value);
      });

    this.form
      .get('category')
      .valueChanges.pipe(
        takeUntil(this.destroyed$),
        filter((s) => typeof s == 'string' || !s)
      )
      .subscribe((value) => {
        this._facade.setCategoriesFilter(value);
      });

    this.form
      .get('subCategory')
      .valueChanges.pipe(
        takeUntil(this.destroyed$),
        filter((s) => typeof s == 'string' || !s)
      )
      .subscribe((value) => {
        this._facade.setSubCategoriesFilter(value);
      });
  }
}

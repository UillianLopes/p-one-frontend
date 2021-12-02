import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryModel, EntryType } from '@p-one/core';
import { DestroyableMixin } from '@p-one/shared';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';

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
    type: [EntryType.Credit],
    category: [null, [Validators.required]],
    subCategory: [null],
  });

  public readonly categories$ = this._facade.filtredCategories$;
  public readonly subCategories$ = this._facade.filtredSubCategories$;
  public readonly isFirstStepInvalid$ = this._facade.isFirstStepInvalid$;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _facade: EntryCreateFacade
  ) {
    super();
  }

  displayFn = (obj: any) => obj.name;

  ngOnInit(): void {
    this.form
      .get('type')
      .valueChanges.pipe(
        takeUntil(this.destroyed$),
        startWith(this.form.get('type').value),
        filter((type) => !!type)
      )
      .subscribe((type) => {
        this._facade.loadCategories(type);
      });

    this.form
      .get('category')
      .valueChanges.pipe(
        takeUntil(this.destroyed$),
        filter((value) => !!value && typeof value != 'string'),
        map((value) => value as CategoryModel)
      )
      .subscribe((category) => {
        this._facade.loadSubCategories(category.id);
      });

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

import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { generateColor } from '@p-one/core';
import { EEntryOperation } from '@p-one/domain/financial';
import { map, startWith } from 'rxjs/operators';

import { CategoryFacade } from '../../+state/category.facade';

@Component({
  selector: 'p-one-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss'],
})
export class CreateCategoryModalComponent {
  public readonly EntryType = EEntryOperation;
  public readonly form = this._formBuilder.group({
    name: ['', [Validators.required]],
    operation: [EEntryOperation.Credit, [Validators.required]],
    description: [''],
    color: [generateColor(), [Validators.required]],
  });

  public readonly isCreateCategoryDisabled$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((status) => status === 'INVALID')
  );

  public readonly isLoading$ = this._facade.isLoading$;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _facade: CategoryFacade
  ) {}

  createCategory(): void {
    this._facade.createCategory(this.form.value);
  }
}

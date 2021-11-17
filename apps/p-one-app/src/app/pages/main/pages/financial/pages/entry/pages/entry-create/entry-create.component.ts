import { Component, OnInit } from '@angular/core';
import { EntryRecurrence, EntryType } from '@p-one/core';
import { DestroyableMixin } from '@p-one/shared';

import { EntryCreateFacade } from './+state/entry-create.facade';

@Component({
  selector: 'p-one-entry-create',
  templateUrl: './entry-create.component.html',
  styleUrls: ['./entry-create.component.scss'],
})
export class EntryCreateComponent extends DestroyableMixin() implements OnInit {
  EntryType = EntryType;
  EntryRecurrence = EntryRecurrence;

  public readonly isLoading$ = this._facade.isLoading$;
  public readonly isFirstStepInvalid$ = this._facade.isFirstStepInvalid$;
  public readonly isSecondStepInvalid$ = this._facade.isSecondStepInvalid$;

  constructor(private readonly _facade: EntryCreateFacade) {
    super();
  }

  displayFn = (obj: any) => obj.name;

  ngOnInit(): void {
    this._facade.loadCategories();
    this._facade.loadSubCategories();
  }
}
